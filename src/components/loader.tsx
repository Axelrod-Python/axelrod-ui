import * as React from 'react';

const Loader = () => (
<svg width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="uil-spin">
  <rect x="0" y="0" width="100" height="100" fill="none" className="bk" />
    <g transform="translate(50 50)">
      <g transform="rotate(0) translate(34 0)">
        <circle cx="0" cy="0" r="8" fill="#1b2838">
          <animate attributeName="opacity" from="1" to="0.1" begin="0s" dur="1.2s" repeatCount="indefinite" />
        </circle>
      </g>
      <g transform="rotate(45) translate(34 0)">
        <circle cx="0" cy="0" r="8" fill="#1b2838">
          <animate attributeName="opacity" from="1" to="0.1" begin="0.15s" dur="1.2s" repeatCount="indefinite" />
        </circle>
      </g>
      <g transform="rotate(90) translate(34 0)">
        <circle cx="0" cy="0" r="8" fill="#1b2838">
          <animate attributeName="opacity" from="1" to="0.1" begin="0.3s" dur="1.2s" repeatCount="indefinite" />
        </circle>
      </g>
      <g transform="rotate(135) translate(34 0)">
        <circle cx="0" cy="0" r="8" fill="#1b2838">
          <animate attributeName="opacity" from="1" to="0.1" begin="0.44s" dur="1.2s" repeatCount="indefinite" />
        </circle>
      </g>
      <g transform="rotate(180) translate(34 0)">
        <circle cx="0" cy="0" r="8" fill="#1b2838">
          <animate attributeName="opacity" from="1" to="0.1" begin="0.6s" dur="1.2s" repeatCount="indefinite" />
        </circle>
      </g>
      <g transform="rotate(225) translate(34 0)">
        <circle cx="0" cy="0" r="8" fill="#1b2838">
          <animate attributeName="opacity" from="1" to="0.1" begin="0.75s" dur="1.2s" repeatCount="indefinite" />
        </circle>
      </g>
      <g transform="rotate(270) translate(34 0)">
        <circle cx="0" cy="0" r="8" fill="#1b2838">
          <animate attributeName="opacity" from="1" to="0.1" begin="0.89s" dur="1.2s" repeatCount="indefinite" />
        </circle>
      </g>
      <g transform="rotate(315) translate(34 0)">
        <circle cx="0" cy="0" r="8" fill="#1b2838">
          <animate attributeName="opacity" from="1" to="0.1" begin="1.05s" dur="1.2s" repeatCount="indefinite" />
        </circle>
      </g>
    </g>
  </svg>
);

export default Loader;
