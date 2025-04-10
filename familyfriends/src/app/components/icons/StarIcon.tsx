export default function StarIcon({ isFilled = false }: { isFilled?: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={isFilled ? "black" : "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="bgblur_1_1_270_clip_path">
          <circle cx="12" cy="12" r="12" />
        </clipPath>
        <clipPath id="clip0_1_270">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>

      <g clipPath="url(#clip0_1_270)">
        <foreignObject x="-40" y="-40" width="104" height="104">
          <div
            style={{
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              clipPath: "url(#bgblur_1_1_270_clip_path)",
              height: "100%",
              width: "100%",
            }}
          />
        </foreignObject>

        <circle
          cx="12"
          cy="12"
          r="12"
          fill={isFilled ? "#fff" : "#FEFEFE"}
          fillOpacity={isFilled ? "1" : "0.50"}
        />
        <path
          d="M12 5L14.163 9.27865L19 9.96898L15.5 13.2976L16.326 18L12 15.7787L7.674 18L8.5 13.2976L5 9.96898L9.837 9.27865L12 5Z"
          stroke={isFilled ? "none" : "white"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
