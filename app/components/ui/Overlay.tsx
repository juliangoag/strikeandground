interface OverlayProps {
  onClick: () => void;
}

/**
 * Overlay transparente para cerrar dropdowns/modales al hacer click fuera
 * Componente reutilizable que cubre toda la pantalla
 */
export function Overlay({ onClick }: OverlayProps) {
  return (
    <div
      className="fixed inset-0 z-40"
      onClick={onClick}
      aria-hidden="true"
    />
  );
}

