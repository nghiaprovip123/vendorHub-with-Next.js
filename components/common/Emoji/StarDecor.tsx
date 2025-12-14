export const StarDecorEmoji = ({ 
  width = 24, 
  height = 24,  
  top = 0,
  left = 0,
}: { 
  width?: number,
  height?: number,
  top?: number,
  left?: number,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
      }}
    >
      <svg width={width} height={height} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.4">
          <path d="M102.637 91.2656L102.728 93.416L104.312 91.959L150.389 49.6104L108.041 95.6875L106.584 97.2725L108.734 97.3633L171.265 100L108.734 102.637L106.584 102.728L108.041 104.312L150.389 150.389L104.312 108.041L102.728 106.584L102.637 108.734L100 171.265L97.3633 108.734L97.2725 106.584L95.6875 108.041L49.6104 150.389L91.959 104.312L93.416 102.728L91.2656 102.637L28.7344 100L91.2656 97.3633L93.416 97.2725L91.959 95.6875L49.6104 49.6104L95.6875 91.959L97.2725 93.416L97.3633 91.2656L100 28.7344L102.637 91.2656Z" fill="#C8A300" stroke="black" strokeWidth="2"/>
        </g>
      </svg>
    </div>
  );
};
