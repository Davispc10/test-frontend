export default function Loading() {
  return (
    <div className="relative flex w-full justify-center items-center z-50 h-20 mt-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        className="fill-marvel-secondary"
        viewBox="0 0 200 200"
      >
        <circle cx="12.5" cy="12.5" r="12.5">
          <animate
            attributeName="fill-opacity"
            begin="0s"
            calcMode="linear"
            dur="1s"
            repeatCount="indefinite"
            values="1;.2;1"
          ></animate>
        </circle>
        <circle cx="12.5" cy="52.5" r="12.5" fillOpacity="0.5">
          <animate
            attributeName="fill-opacity"
            begin="100ms"
            calcMode="linear"
            dur="1s"
            repeatCount="indefinite"
            values="1;.2;1"
          ></animate>
        </circle>
        <circle cx="52.5" cy="12.5" r="12.5">
          <animate
            attributeName="fill-opacity"
            begin="300ms"
            calcMode="linear"
            dur="1s"
            repeatCount="indefinite"
            values="1;.2;1"
          ></animate>
        </circle>
        <circle cx="52.5" cy="52.5" r="12.5">
          <animate
            attributeName="fill-opacity"
            begin="600ms"
            calcMode="linear"
            dur="1s"
            repeatCount="indefinite"
            values="1;.2;1"
          ></animate>
        </circle>
        <circle cx="92.5" cy="12.5" r="12.5">
          <animate
            attributeName="fill-opacity"
            begin="800ms"
            calcMode="linear"
            dur="1s"
            repeatCount="indefinite"
            values="1;.2;1"
          ></animate>
        </circle>
        <circle cx="92.5" cy="52.5" r="12.5">
          <animate
            attributeName="fill-opacity"
            begin="400ms"
            calcMode="linear"
            dur="1s"
            repeatCount="indefinite"
            values="1;.2;1"
          ></animate>
        </circle>
        <circle cx="12.5" cy="92.5" r="12.5">
          <animate
            attributeName="fill-opacity"
            begin="700ms"
            calcMode="linear"
            dur="1s"
            repeatCount="indefinite"
            values="1;.2;1"
          ></animate>
        </circle>
        <circle cx="52.5" cy="92.5" r="12.5">
          <animate
            attributeName="fill-opacity"
            begin="500ms"
            calcMode="linear"
            dur="1s"
            repeatCount="indefinite"
            values="1;.2;1"
          ></animate>
        </circle>
        <circle cx="92.5" cy="92.5" r="12.5">
          <animate
            attributeName="fill-opacity"
            begin="200ms"
            calcMode="linear"
            dur="1s"
            repeatCount="indefinite"
            values="1;.2;1"
          ></animate>
        </circle>
      </svg>
    </div>
  );
}
