import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Home, CheckCircle, Loader } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../auth/context/AuthContext';
import { OrderSummary } from '../components/OrderSummary';
import { ShippingForm } from '../components/ShippingForm';
import { PaymentMethodSelector } from '../components/PaymentMethodSelector';
import { PromoCodeInput } from '../components/PromoCodeInput';
import { ShippingInfo, PaymentMethod } from '../types/checkout';
import { mockCheckoutService } from '../services/mockCheckoutService';

type Step = 1 | 2 | 3;

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, itemCount, subtotal, clearCart, removeItem } = useCart();
  const { user } = useAuth();

  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [promoCode, setPromoCode] = useState<string | undefined>();
  const [discount, setDiscount] = useState(0);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Redirigir si el carrito está vacío
  useEffect(() => {
    if (itemCount === 0 && currentStep !== 3) {
      navigate('/eventos');
    }
  }, [itemCount, navigate, currentStep]);

  // Calcular total con descuento
  const total = subtotal - (subtotal * discount) / 100;

  // Paso 1: Guardar información de envío
  const handleShippingSubmit = (data: ShippingInfo) => {
    setShippingInfo(data);
    setCurrentStep(2);
    window.scrollTo(0, 0);
  };

  // Aplicar código promocional
  const handleApplyPromo = (code: string, discountValue: number) => {
    setPromoCode(code);
    setDiscount(discountValue);
  };

  // Remover código promocional
  const handleRemovePromo = () => {
    setPromoCode(undefined);
    setDiscount(0);
  };

  // Paso 2: Procesar pago
  const handleProcessPayment = async () => {
    if (!paymentMethod) {
      setError('Selecciona un método de pago');
      return;
    }

    if (!acceptedTerms) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Simular procesamiento de pago
      const paymentResult = await mockCheckoutService.simulatePayment();

      if (!paymentResult.success) {
        setError(paymentResult.message);
        setProcessing(false);
        return;
      }

      // Crear orden
      const order = await mockCheckoutService.createOrder({
        userId: user?.id || 'guest',
        items,
        shippingInfo: shippingInfo!,
        paymentMethod,
        subtotal,
        discount,
        total,
        promoCode,
      });

      setOrderId(order.id);
      clearCart();
      setCurrentStep(3);
      window.scrollTo(0, 0);
    } catch (err) {
      setError('Ocurrió un error al procesar el pago. Intenta nuevamente.');
      console.error('[Checkout] Error:', err);
    } finally {
      setProcessing(false);
    }
  };

  // Renderizar indicador de pasos
  const renderStepIndicator = () => {
    const steps = [
      { number: 1, label: 'Información' },
      { number: 2, label: 'Pago' },
      { number: 3, label: 'Confirmación' },
    ];

    return (
      <div className="flex items-center justify-center mb-12">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                  ${
                    currentStep >= step.number
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-400'
                  }
                  ${
                    currentStep === step.number
                      ? 'ring-4 ring-red-500/30'
                      : ''
                  }
                `}
              >
                {currentStep > step.number ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`mt-2 text-sm ${
                  currentStep >= step.number ? 'text-white' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-24 h-1 mx-4 ${
                  currentStep > step.number ? 'bg-red-600' : 'bg-gray-800'
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-white transition-colors">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/eventos" className="hover:text-white transition-colors">
            Eventos
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Checkout</span>
        </div>

        {/* Título */}
        <h1 className="text-4xl font-bold text-white mb-8">Finalizar Compra</h1>

        {/* Indicador de pasos */}
        {renderStepIndicator()}

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal: Formulario */}
          <div className="lg:col-span-2">
            {/* Paso 1: Información */}
            {currentStep === 1 && (
              <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl p-6 border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Información de Contacto
                </h2>
                <ShippingForm
                  onSubmit={handleShippingSubmit}
                  initialData={
                    user
                      ? {
                          fullName: user.name,
                          email: user.email,
                          phone: '',
                          address: '',
                        }
                      : undefined
                  }
                />
              </div>
            )}

            {/* Paso 2: Pago */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Método de pago */}
                <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl p-6 border border-gray-800">
                  <PaymentMethodSelector
                    selectedMethod={paymentMethod}
                    onSelect={setPaymentMethod}
                  />
                </div>

                {/* Código promocional */}
                <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl p-6 border border-gray-800">
                  <PromoCodeInput
                    onApply={handleApplyPromo}
                    appliedCode={promoCode}
                    onRemove={handleRemovePromo}
                  />
                </div>

                {/* Términos y condiciones */}
                <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl p-6 border border-gray-800">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-gray-700 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-gray-300 text-sm">
                      Acepto los{' '}
                      <a href="#" className="text-red-500 hover:text-red-400">
                        términos y condiciones
                      </a>{' '}
                      y la{' '}
                      <a href="#" className="text-red-500 hover:text-red-400">
                        política de privacidad
                      </a>
                    </span>
                  </label>
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500 rounded-lg p-4">
                    <p className="text-red-500">{error}</p>
                  </div>
                )}

                {/* Botones */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 rounded-lg transition-colors"
                    disabled={processing}
                  >
                    Volver
                  </button>
                  <button
                    onClick={handleProcessPayment}
                    disabled={processing || !paymentMethod || !acceptedTerms}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {processing ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      `Pagar ${total.toFixed(2)}€`
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Paso 3: Confirmación */}
            {currentStep === 3 && (
              <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl p-8 border border-gray-800 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>

                <h2 className="text-3xl font-bold text-white mb-4">
                  ¡Compra Exitosa!
                </h2>

                <p className="text-gray-300 mb-6">
                  Tu orden ha sido procesada exitosamente. Recibirás las entradas en
                  tu email.
                </p>

                <div className="bg-black/50 rounded-lg p-4 mb-8 inline-block">
                  <p className="text-gray-400 text-sm mb-2">Número de Orden</p>
                  <p className="text-white font-mono text-xl font-bold">{orderId}</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="text-left bg-black/30 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-2">
                      Información de Contacto
                    </h3>
                    <p className="text-gray-400 text-sm">{shippingInfo?.fullName}</p>
                    <p className="text-gray-400 text-sm">{shippingInfo?.email}</p>
                    <p className="text-gray-400 text-sm">{shippingInfo?.phone}</p>
                  </div>

                  <div className="text-left bg-black/30 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-2">Total Pagado</h3>
                    <p className="text-red-500 text-2xl font-bold">
                      {total.toFixed(2)}€
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link
                    to="/profile"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg transition-colors text-center"
                  >
                    Ver Mis Entradas
                  </Link>
                  <Link
                    to="/"
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 rounded-lg transition-colors text-center"
                  >
                    Volver al Inicio
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Columna lateral: Resumen */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <OrderSummary
                items={items}
                subtotal={subtotal}
                discount={discount}
                total={total}
                onRemoveItem={currentStep === 1 ? removeItem : undefined}
                promoCode={promoCode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

