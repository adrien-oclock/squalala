import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Logo = ({ title }) => (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width="337.000000pt"
    height="239.000000pt"
    viewBox="0 0 337.000000 239.000000"
    preserveAspectRatio="xMidYMid meet"
  >
    <title>{title}</title>
    <g
      transform="translate(0.000000,239.000000) scale(0.100000,-0.100000)"
      fill="currentColor"
      stroke="currentColor"
    >
      <path d="M1450 2127 c-72 -25 -154 -70 -173 -96 -6 -10 -20 -20 -30 -24 -9 -4
-20 -15 -24 -24 -4 -10 -17 -32 -30 -49 -13 -17 -23 -37 -23 -45 0 -8 -5 -20
-11 -26 -13 -13 -17 -142 -4 -151 6 -4 16 -19 23 -35 10 -23 9 -30 -5 -47 -23
-26 -68 -26 -118 2 -22 12 -58 23 -80 24 -25 1 -45 9 -56 22 -8 11 -33 29 -54
41 -21 11 -41 24 -44 28 -14 19 -72 43 -105 43 -25 0 -38 -6 -46 -20 -14 -26
-39 -25 -81 3 -51 35 -66 38 -115 26 -36 -9 -51 -9 -70 1 -13 8 -27 10 -30 7
-4 -4 5 -11 20 -17 29 -11 27 -30 -3 -30 -10 0 -21 9 -24 20 -3 13 -14 20 -30
20 -13 0 -31 7 -38 16 -14 18 -11 17 51 -4 12 -4 13 -2 3 8 -7 8 -29 13 -50
12 -21 -1 -57 -2 -80 -2 -46 0 -50 -5 -28 -34 8 -11 15 -35 15 -53 0 -23 6
-36 23 -45 12 -7 25 -11 29 -10 3 1 12 -6 20 -15 11 -15 11 -16 -5 -10 -11 4
-16 3 -12 -3 3 -6 13 -10 21 -10 8 0 26 -7 39 -16 14 -9 31 -14 39 -11 7 3 19
0 25 -6 6 -6 31 -10 55 -8 31 1 45 -2 49 -14 8 -19 28 -19 53 0 18 14 17 15
-8 6 -24 -9 -30 -6 -62 34 -26 31 -36 53 -36 78 0 20 -6 38 -12 41 -7 3 -4 5
7 3 15 -2 21 -11 23 -36 2 -21 13 -42 30 -56 32 -28 43 -24 16 6 -19 21 -19
21 5 40 13 10 29 19 37 19 8 0 14 5 14 10 0 15 -26 12 -40 -5 -17 -21 -40 -19
-40 4 0 11 -10 22 -23 26 l-22 7 25 8 c45 14 80 10 118 -14 21 -13 62 -26 97
-31 33 -4 66 -12 73 -17 7 -6 12 -33 12 -62 0 -28 -4 -46 -8 -41 -13 18 -73
45 -99 45 -14 0 -38 -11 -55 -25 -20 -17 -24 -25 -14 -25 9 0 21 8 28 19 10
16 16 10 51 -61 35 -71 38 -84 33 -131 -10 -86 -9 -100 10 -114 27 -20 54 -16
63 11 19 47 55 76 99 76 33 0 50 -8 99 -49 44 -36 69 -49 102 -54 52 -7 95
-35 99 -67 4 -25 49 -80 67 -80 25 0 135 -102 135 -126 0 -6 7 -25 15 -40 21
-41 19 -68 -10 -110 -14 -20 -25 -47 -25 -59 0 -12 -15 -39 -33 -61 -58 -69
-95 -128 -108 -171 -10 -36 -9 -51 6 -99 43 -137 129 -207 285 -233 41 -7 97
-19 124 -27 78 -22 239 -18 311 7 37 13 106 25 179 31 70 5 132 16 149 25 22
11 54 14 121 12 209 -6 200 -7 245 38 23 22 41 48 41 56 0 9 12 24 26 34 86
58 200 189 218 249 10 33 -9 103 -36 131 -44 47 -117 77 -183 75 -70 -3 -160
-28 -194 -54 -19 -14 -34 -17 -76 -12 -34 4 -55 3 -59 -5 -9 -13 -46 -15 -46
-2 0 5 -10 11 -22 13 -14 2 -24 13 -30 33 -4 16 -16 36 -25 43 -18 13 -19 49
-14 355 1 51 36 111 83 142 20 14 42 25 48 25 5 0 10 4 10 8 0 4 25 16 55 27
48 16 60 17 97 6 24 -7 57 -23 73 -36 17 -12 40 -25 51 -29 12 -4 24 -16 27
-26 13 -48 77 -5 77 52 0 15 5 30 10 33 6 3 10 38 10 77 0 59 -5 79 -26 115
-14 25 -23 47 -20 50 8 8 -50 53 -68 53 -20 0 -21 16 -1 24 9 3 15 17 14 33
l0 28 -12 -25 c-19 -41 -37 -50 -90 -43 -51 6 -97 -10 -97 -33 0 -19 -26 -30
-93 -43 -32 -6 -70 -17 -85 -25 -15 -7 -67 -23 -115 -35 -70 -18 -92 -20 -103
-10 -8 7 -31 13 -51 14 -38 1 -61 25 -24 25 25 0 71 20 71 32 0 4 -11 8 -24 8
-15 0 -27 7 -31 19 -3 12 -19 21 -41 26 l-35 6 5 62 c2 34 8 71 12 82 7 18 6
18 -9 6 -9 -7 -14 -18 -10 -24 4 -6 1 -7 -8 -2 -11 7 -11 5 1 -10 13 -17 13
-18 -1 -13 -9 4 -28 0 -43 -7 -37 -19 -32 -5 8 25 26 19 33 31 31 50 -2 14 -4
31 -4 38 -2 26 -140 142 -171 142 -9 0 -20 4 -26 10 -11 11 -65 20 -149 26
-44 2 -78 -3 -125 -19z m330 -207 c0 -5 -7 -10 -16 -10 -8 0 -12 5 -9 10 3 6
10 10 16 10 5 0 9 -4 9 -10z m-68 -35 c-5 -29 -10 -31 -27 -9 -14 18 -14 18
-15 -5 0 -20 -3 -22 -27 -16 -24 6 -25 5 -12 -11 13 -16 12 -16 -8 -3 -16 9
-19 16 -10 21 9 6 8 10 -3 18 -24 16 7 31 60 28 39 -3 45 -6 42 -23z m108 15
c0 -5 -4 -10 -9 -10 -6 0 -13 5 -16 10 -3 6 1 10 9 10 9 0 16 -4 16 -10z
m-266 -6 c12 -5 10 -10 -12 -30 -15 -13 -21 -24 -14 -24 7 0 10 -5 6 -11 -4
-8 -9 -7 -15 2 -6 11 -11 11 -21 1 -18 -18 -28 -15 -28 10 0 42 42 68 84 52z
m230 -56 c-3 -10 -2 -18 2 -18 4 0 13 8 20 18 9 11 13 12 14 4 0 -7 8 -24 17
-39 15 -23 18 -24 23 -7 6 16 7 15 13 -5 9 -34 -21 -40 -48 -9 -12 14 -33 29
-46 33 -53 16 -65 43 -19 41 24 -1 29 -5 24 -18z m-214 -12 c0 -16 94 -16 111
1 9 9 15 8 26 -3 8 -8 24 -14 37 -14 25 0 46 -17 46 -37 0 -9 -16 -13 -54 -13
-43 0 -55 -4 -58 -17 -3 -15 -4 -15 -17 1 -13 15 -12 18 7 23 27 7 29 23 2 23
-21 0 -55 -53 -46 -75 3 -8 -2 -11 -13 -8 -14 3 -20 -3 -26 -24 -4 -15 -10
-22 -12 -15 -3 6 -13 12 -23 12 -20 0 -40 45 -40 91 0 15 -6 30 -12 32 -8 3
-6 6 5 6 11 1 17 -6 17 -22 0 -29 40 -54 67 -41 15 6 12 9 -14 12 -44 5 -42
20 4 24 20 2 38 8 40 13 2 6 -15 9 -41 7 -45 -4 -45 -4 -33 21 12 25 27 27 27
3z m348 -9 c13 4 14 3 6 -6 -15 -17 -44 -3 -36 17 6 16 7 16 10 0 2 -11 9 -15
20 -11z m-1672 -25 c4 -9 8 -37 9 -62 1 -25 0 -39 -2 -32 -3 6 -11 12 -19 12
-11 0 -14 8 -10 30 2 16 0 32 -5 36 -5 3 -9 14 -9 24 0 23 25 17 36 -8z m43 4
c7 -8 10 -26 7 -40 -3 -15 1 -32 10 -40 8 -8 14 -19 14 -25 0 -5 8 -14 17 -20
10 -5 15 -12 11 -16 -10 -10 -48 14 -48 30 0 8 -6 18 -13 22 -16 9 -32 103
-18 103 5 0 14 -6 20 -14z m1201 -53 c0 -32 29 -73 50 -73 6 0 10 -5 10 -10 0
-7 -6 -7 -19 0 -31 16 -38 12 -33 -20 2 -16 0 -30 -6 -30 -12 0 -22 23 -23 53
0 19 -2 18 -11 -6 l-10 -27 -25 20 c-14 11 -32 20 -39 20 -8 0 -14 6 -14 14 0
11 5 12 25 3 14 -7 25 -16 25 -20 0 -5 5 -5 11 -2 7 5 4 14 -7 26 -13 14 -31
19 -68 19 -35 0 -46 -3 -36 -10 8 -5 12 -11 9 -14 -7 -7 -69 25 -64 34 3 4 29
11 58 14 59 8 107 -5 107 -29 0 -10 8 -14 25 -13 21 2 23 6 18 28 -3 14 -11
31 -18 39 -10 10 -11 18 -2 32 10 16 12 16 24 1 7 -9 13 -32 13 -49z m-1132 1
c3 -31 26 -58 81 -96 l25 -17 -25 -9 c-27 -11 -59 1 -59 21 0 7 -9 23 -20 37
-11 14 -20 36 -20 51 0 14 -6 31 -12 38 -11 10 -9 12 7 9 14 -2 21 -12 23 -34z
m-28 1 c0 -8 -4 -15 -10 -15 -5 0 -10 7 -10 15 0 8 5 15 10 15 6 0 10 -7 10
-15z m1130 -24 c-1 -13 -3 -13 -15 3 -19 26 -19 42 0 26 8 -7 15 -20 15 -29z
m439 22 c0 -10 -3 -13 -5 -7 -3 7 -15 10 -27 8 -21 -4 -21 -4 -2 5 29 14 35
13 34 -6z m45 8 c3 -4 3 -11 0 -14 -8 -8 -34 3 -34 14 0 11 27 12 34 0z
m-1532 -26 c4 -21 3 -23 -13 -14 -22 11 -25 39 -5 39 7 0 16 -11 18 -25z
m1446 6 c7 0 10 -5 7 -11 -8 -14 -73 -9 -79 6 -4 11 8 12 72 5z m-92 -13 c4
-7 3 -8 -4 -4 -7 4 -12 2 -12 -5 0 -31 -33 -49 -88 -49 -54 0 -55 0 -36 19 10
10 21 15 24 11 3 -4 15 -9 28 -13 19 -4 21 -3 11 9 -6 7 -16 11 -22 7 -6 -3
-7 -1 -3 6 4 6 12 9 17 6 18 -12 50 -14 43 -3 -4 5 0 14 7 19 19 12 26 11 35
-3z m158 -23 c-4 -9 4 -19 20 -26 20 -9 28 -22 33 -51 3 -25 14 -45 28 -54 26
-17 45 -74 45 -137 0 -25 5 -49 10 -52 6 -3 10 -15 10 -25 0 -10 6 -25 13 -32
45 -46 50 -192 9 -247 -29 -40 -30 -113 -2 -141 27 -27 77 -27 85 0 3 11 11
20 17 20 6 0 4 -9 -4 -22 -8 -13 -21 -33 -29 -45 -8 -13 -19 -23 -26 -23 -6 0
-13 -6 -15 -12 -6 -17 -123 -17 -140 0 -6 6 -19 12 -27 12 -35 0 -101 132
-101 202 0 33 -45 124 -65 132 -9 3 -15 18 -15 35 0 16 -4 32 -9 35 -5 3 -12
22 -15 41 -5 23 -22 49 -49 75 -23 23 -72 70 -109 105 -38 36 -68 69 -68 75 0
5 21 10 47 12 42 3 47 6 56 33 5 17 12 32 14 35 8 9 23 -25 23 -52 0 -36 36
-39 51 -4 8 16 22 26 48 30 56 9 68 7 75 -11 3 -10 9 -24 12 -30 3 -8 -1 -13
-10 -13 -10 0 -16 9 -16 25 0 14 -4 25 -10 25 -5 0 -10 -11 -10 -25 0 -14 4
-25 9 -25 5 0 15 -15 22 -32 l13 -33 4 30 c2 16 9 33 15 37 9 6 9 12 0 28 -18
28 -16 31 13 28 36 -4 40 13 9 46 -32 35 -32 44 3 48 35 5 42 1 36 -17z m89
11 c16 -13 15 -14 -17 -18 -27 -3 -36 0 -39 14 -6 22 29 24 56 4z m-160 -30
c11 -27 -36 -43 -143 -49 -43 -2 -47 17 -5 20 79 7 115 16 115 29 0 18 26 18
33 0z m-513 -32 c0 -8 -4 -12 -10 -9 -5 3 -10 10 -10 16 0 5 5 9 10 9 6 0 10
-7 10 -16z m44 -9 c-4 -8 -10 -12 -15 -9 -14 8 -10 24 6 24 9 0 12 -6 9 -15z
m225 -15 c-10 -26 -16 -30 -48 -30 -44 0 -51 5 -44 30 4 15 10 17 34 10 21 -6
27 -5 23 2 -5 7 -1 9 9 5 10 -3 17 -2 17 3 0 6 4 10 9 10 6 0 6 -12 0 -30z
m-189 10 c0 -5 -4 -10 -10 -10 -5 0 -10 5 -10 10 0 6 5 10 10 10 6 0 10 -4 10
-10z m280 -35 c0 -8 -7 -15 -15 -15 -8 0 -15 7 -15 15 0 8 7 15 15 15 8 0 15
-7 15 -15z"
      />
      <path d="M1680 1811 c0 -14 18 -23 31 -15 8 4 7 9 -2 15 -18 11 -29 11 -29 0z" />
      <path d="M1530 1720 c0 -5 9 -10 21 -10 11 0 17 5 14 10 -3 6 -13 10 -21 10
-8 0 -14 -4 -14 -10z"
      />
      <path d="M1756 1568 c11 -69 15 -78 29 -78 20 0 19 16 -1 24 -10 4 -13 13 -9
26 7 23 -2 60 -15 60 -5 0 -7 -15 -4 -32z"
      />
      <path d="M2001 1373 c6 -15 8 -45 5 -65 -5 -27 -1 -46 14 -70 13 -21 20 -51
20 -81 0 -35 4 -47 13 -44 19 7 14 90 -9 123 -12 18 -21 53 -24 93 -3 39 -10
66 -18 69 -9 3 -10 -3 -1 -25z"
      />
      <path d="M1820 1321 c0 -17 11 -42 25 -59 14 -17 25 -39 25 -51 0 -12 5 -21
10 -21 17 0 11 36 -9 62 -11 13 -22 41 -26 61 -9 44 -25 49 -25 8z"
      />
      <path d="M1920 1046 c0 -25 4 -47 9 -50 5 -3 12 -23 16 -43 7 -38 33 -69 73
-84 32 -12 42 -11 42 5 0 8 -16 16 -40 20 -26 4 -43 13 -46 24 -3 9 -10 26
-14 37 -5 11 -14 46 -20 78 -6 31 -13 57 -16 57 -2 0 -4 -20 -4 -44z"
      />
      <path d="M2876 1934 c-24 -23 -19 -28 8 -10 14 9 32 13 40 10 23 -9 20 -24 -4
-24 -12 0 -26 -5 -33 -10 -7 -6 -24 -19 -39 -31 -16 -11 -28 -27 -28 -35 0
-16 16 -19 25 -4 4 6 11 7 17 4 7 -5 9 -1 5 9 -7 18 14 38 56 52 40 13 44 29
12 43 -34 16 -40 15 -59 -4z"
      />
      <path d="M2794 1890 c-18 -10 -42 -20 -55 -23 -22 -4 -22 -4 3 -6 29 -1 78 17
78 30 0 4 8 10 18 12 11 3 12 5 2 5 -8 0 -29 -8 -46 -18z"
      />
      <path d="M3085 1861 l40 -6 -45 -8 c-24 -4 -49 -12 -55 -16 -5 -5 -21 -11 -35
-14 -14 -2 21 -5 78 -6 56 0 102 -5 102 -10 0 -5 -48 -9 -106 -9 -113 0 -143
-10 -108 -37 12 -9 42 -14 82 -15 60 0 85 -14 40 -23 -13 -2 -4 -5 20 -6 31
-1 42 3 42 14 0 7 7 18 15 23 9 4 17 21 18 38 2 28 1 29 -50 32 -58 3 -72 19
-20 24 48 5 39 23 -13 24 l-45 2 40 -7z m50 -95 c11 -2 -24 -4 -77 -5 -53 0
-99 2 -101 7 -5 7 133 5 178 -2z"
      />
      <path d="M2930 1848 c-50 -9 -53 -11 -35 -24 10 -8 30 -14 44 -13 24 0 24 1 6
9 -19 8 -19 9 1 9 12 1 37 8 55 16 30 13 31 14 9 13 -14 0 -50 -5 -80 -10z"
      />
      <path d="M2721 1812 c-8 -6 -9 -12 -3 -16 6 -3 13 -2 17 4 9 15 47 12 69 -5
22 -16 66 -20 66 -6 0 12 -18 18 -81 25 -30 4 -60 3 -68 -2z"
      />
      <path d="M2900 1780 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0
-10 -4 -10 -10z"
      />
      <path d="M2741 1726 c2 -2 42 -6 89 -8 47 -3 74 -2 60 2 -25 8 -157 13 -149 6z" />
      <path d="M2925 1700 c3 -5 12 -7 20 -3 21 7 19 13 -6 13 -11 0 -18 -4 -14 -10z" />
    </g>
  </svg>

);

Logo.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Logo;
