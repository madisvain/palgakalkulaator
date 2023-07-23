import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 justify-between items-center border-t border-t-[#E9E7E5]">
          <Link href="/">
            <svg
              width="166"
              height="24"
              viewBox="0 0 166 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.7704 14.2096C17.9716 14.2043 17.9716 14.2043 17.7704 14.2096V14.2096ZM17.5847 14.2117C17.6449 14.2117 17.705 14.211 17.7652 14.2096C17.705 14.211 17.6449 14.2117 17.5847 14.2117ZM17.5847 1.89618C14.7076 1.89618 12.3746 4.22887 12.3746 7.10603H11.7426C11.7426 3.87995 14.3587 1.26412 17.5847 1.26412C20.8104 1.26412 23.4262 3.87995 23.4262 7.10603H22.7948C22.7948 4.22887 20.4611 1.89618 17.5847 1.89618ZM17.5847 3.15995C15.4054 3.15995 13.6387 4.92705 13.6387 7.10603H13.0063C13.0063 4.57814 15.0572 2.52789 17.5847 2.52789C20.1122 2.52789 22.1624 4.57814 22.1624 7.10603H21.5311C21.5307 4.92705 19.764 3.16031 17.5847 3.16031V3.15995ZM14.9021 7.10603C14.9021 5.62489 16.1033 4.42373 17.5847 4.42373V4.42408C19.0658 4.42408 20.2663 5.62489 20.2663 7.10603H20.8987C20.8987 5.27597 19.4144 3.79202 17.5847 3.79202C15.755 3.79202 14.2701 5.27597 14.2701 7.10603H14.9021ZM7.7997 14.2117H7.79654H7.7997ZM7.79654 9.78798C7.73604 9.78798 7.67589 9.78868 7.61575 9.79009L7.79654 9.78798ZM10.9146 4.65094C10.9737 4.48915 10.9737 4.48915 10.9146 4.65094V4.65094ZM10.4813 6.91961C10.4862 6.71877 10.4862 6.71877 10.4813 6.91961V6.91961ZM10.4788 7.10603C10.4788 5.62489 9.27766 4.42373 7.79654 4.42373C6.31542 4.42373 5.11462 5.62489 5.11462 7.10603H4.48257C4.48257 5.27597 5.96651 3.79202 7.79654 3.79202C9.02582 3.79202 10.0996 4.46171 10.6712 5.45676L10.6708 5.46028C10.7338 5.19296 10.8126 4.93057 10.9054 4.67592C10.1826 3.75332 9.05888 3.15995 7.79654 3.15995C5.61794 3.15995 3.85087 4.92705 3.85017 7.10603H3.21847C3.21847 4.57814 5.26903 2.52789 7.79654 2.52789C9.13732 2.52789 10.3434 3.10473 11.1805 4.02345C11.2772 3.82297 11.3834 3.62776 11.4978 3.43817L11.4967 3.43923C10.553 2.48639 9.24319 1.89618 7.79654 1.89618C4.91977 1.89618 2.58677 4.22887 2.58677 7.10603H1.95472C1.95472 3.87995 4.5705 1.26412 7.79654 1.26412C9.37262 1.26412 10.8038 1.88915 11.8544 2.90389C11.98 2.73366 12.1126 2.56869 12.2522 2.41006C11.0915 1.30844 9.52281 0.632061 7.79654 0.632061C4.22159 0.632061 1.32302 3.53103 1.32266 7.10603H0.690613C0.690613 3.18211 3.87268 0 7.79654 0C9.68495 0 11.4172 0.753057 12.6901 1.95527C13.9644 0.74356 15.6879 0.000351731 17.5847 0.000351731C21.5086 0.000351731 24.6903 3.18211 24.6903 7.10603H24.0586C24.0586 3.53138 21.1597 0.632061 17.5847 0.632061C14.0098 0.632061 11.1101 3.53103 11.1101 7.10603H10.4788C10.4788 7.04553 10.4792 6.98503 10.4806 6.92524C10.4792 6.98503 10.4788 7.04553 10.4788 7.10603ZM17.5809 9.78833C17.4113 9.78833 17.4113 9.78833 17.5809 9.78833V9.78833ZM7.95763 14.2099L7.97697 14.2096H7.97979L7.98225 14.2092C8.16761 14.2047 8.08073 14.2075 7.95763 14.2099ZM7.7997 14.2117C7.85035 14.2117 7.90135 14.211 7.95165 14.2099C7.90135 14.211 7.85035 14.2117 7.7997 14.2117ZM10.4788 16.8926C10.4777 15.4122 9.27695 14.2117 7.79654 14.2117C6.31542 14.2117 5.11462 15.4125 5.11462 16.8937H4.48257C4.48257 15.064 5.96651 13.58 7.79654 13.5796C11.3715 13.5796 14.2701 10.6807 14.2701 7.10603H14.9021C14.9021 8.58576 16.1018 9.78622 17.5809 9.78833H17.5847C19.0658 9.78833 20.2663 8.58717 20.2663 7.10603H20.8987C20.8987 8.93609 19.4144 10.4204 17.5847 10.4204C14.0098 10.4204 11.1112 13.319 11.1101 16.894H10.4788C10.4788 16.8328 10.4792 16.7716 10.4813 16.7108C10.4792 16.7713 10.4788 16.8314 10.4788 16.8926ZM17.5847 11.6838C14.7076 11.6838 12.3746 14.0168 12.3746 16.894H11.7426C11.7426 13.6679 14.3587 11.0521 17.5847 11.0521V11.0518C19.764 11.0518 21.5307 9.285 21.5311 7.10603H22.1624C22.1624 9.63427 20.1122 11.6838 17.5847 11.6838ZM17.5847 12.9479C15.4054 12.9479 13.6387 14.715 13.6387 16.894H13.0063C13.0063 14.3661 15.0572 12.3159 17.5847 12.3159C20.4611 12.3159 22.7948 9.98284 22.7948 7.10603H23.4262C23.4262 10.3321 20.8104 12.9476 17.5847 12.9479ZM7.79654 12.9476C5.61794 12.9476 3.85087 14.7147 3.85087 16.8937H3.21882C3.21882 14.3658 5.26903 12.3159 7.79654 12.3159C10.6733 12.3159 13.0063 9.98284 13.0063 7.10603H13.6387C13.638 10.3318 11.0226 12.9476 7.79654 12.9476ZM7.79654 11.6838C4.92012 11.6838 2.58677 14.0168 2.58677 16.8937H1.95472C1.95507 13.6679 4.5705 11.0518 7.79654 11.0518C9.97548 11.0518 11.7426 9.285 11.7426 7.10603H12.3746C12.3746 9.63392 10.3244 11.6838 7.79654 11.6838ZM5.11462 16.894C5.11462 18.3748 6.31542 19.576 7.79654 19.576C9.27766 19.576 10.4788 18.3748 10.4788 16.894H11.1109C11.1101 18.7237 9.62657 20.2077 7.79654 20.2077V20.208C5.96651 20.208 4.48257 18.7237 4.48257 16.894H5.11462ZM7.79654 20.8401C9.97548 20.8401 11.7426 19.0726 11.7426 16.894H12.3746C12.3746 19.4219 10.3244 21.4714 7.79654 21.4714V21.4718C5.26903 21.4718 3.21882 19.4219 3.21882 16.894H3.85087C3.85087 19.0733 5.61794 20.8401 7.79654 20.8401ZM7.79654 22.1039C10.6737 22.1039 13.0063 19.7705 13.0063 16.894H13.6387C13.6387 20.1201 11.0226 22.7356 7.79654 22.7356C4.57121 22.7356 1.95507 20.1201 1.95472 16.894H2.58677C2.58677 19.7712 4.92012 22.1039 7.79654 22.1039ZM7.61575 9.79009C7.67589 9.78868 7.73604 9.78798 7.79654 9.78798L7.61575 9.79009ZM7.61083 9.79009C7.40929 9.79572 7.40929 9.79572 7.61083 9.79009V9.79009ZM14.1997 10.1879V10.1886V10.189C14.2968 10.2938 14.3967 10.3944 14.5018 10.4904L14.5103 10.4858C14.3077 10.5836 14.11 10.6905 13.9187 10.8059L13.8846 10.77C13.9985 10.5815 14.1037 10.3873 14.1997 10.1879ZM14.4755 9.53614V9.53579C14.5673 9.28184 14.6461 9.02156 14.7097 8.7553C15.0024 9.26425 15.4262 9.68844 15.9348 9.98073C15.6362 10.0518 15.3453 10.1415 15.0628 10.2491C15.0931 10.2375 15.124 10.2262 15.1543 10.215C14.9011 10.017 14.6735 9.78868 14.4755 9.53579V9.53614ZM10.2263 13.7851L10.2305 13.7882C10.47 13.976 10.687 14.1906 10.8766 14.428L10.8777 14.4284L10.9054 14.4653C10.8129 14.7186 10.7349 14.9785 10.6712 15.2444C10.3789 14.7354 9.95473 14.3116 9.44543 14.019C9.71204 13.9556 9.97302 13.8776 10.2263 13.7851ZM10.8826 13.5128L10.8791 13.5093C11.0795 13.4129 11.2737 13.3074 11.4629 13.1931V13.1934L11.4914 13.2216L11.4978 13.2279C11.3834 13.4168 11.2779 13.6117 11.1816 13.8114L11.1717 13.8012L11.1675 13.7963L11.1654 13.7942C11.075 13.6968 10.9807 13.6029 10.8826 13.5128ZM14.9025 16.8979C14.9042 18.3769 16.105 19.576 17.5847 19.576C19.0658 19.576 20.2663 18.3748 20.2673 16.894H20.8987C20.8987 18.7237 19.4144 20.208 17.5847 20.208C16.3554 20.208 15.2837 19.5394 14.7104 18.5454L14.7097 18.5433V18.5426C14.6457 18.8092 14.5673 19.0698 14.4751 19.3231L14.4755 19.3245C15.1979 20.2467 16.3224 20.8401 17.5847 20.8401C19.764 20.8401 21.5311 19.0733 21.5311 16.894H22.1624C22.1624 19.4223 20.1129 21.4718 17.5847 21.4718C16.2443 21.4718 15.0379 20.8953 14.1997 19.9766V19.9759C14.103 20.1757 13.9975 20.3709 13.8832 20.5598L13.8835 20.5605C14.8282 21.5136 16.1381 22.1042 17.5847 22.1042V22.1039C20.4611 22.1039 22.7948 19.7712 22.7948 16.894H23.4262C23.4262 20.1201 20.8111 22.7356 17.5847 22.7356V22.7363C16.0136 22.7363 14.5866 22.1148 13.5367 21.1049L13.536 21.1056L13.5255 21.0954C13.4002 21.2657 13.2673 21.4306 13.128 21.5893L13.14 21.6005C14.2996 22.6962 15.8641 23.368 17.5847 23.368C21.1597 23.368 24.0586 20.4687 24.0586 16.894H24.6907C24.6903 20.8176 21.5086 24 17.5847 24C15.6949 24 13.9764 23.2614 12.7038 22.0578L12.6971 22.0514L12.6908 22.0451L12.6898 22.0441C11.4151 23.2561 9.69304 23.9997 7.79654 23.9997V24C3.87409 24 0.693075 20.82 0.690613 16.8979V16.894C0.69202 14.9985 1.43557 13.2757 2.64621 12.0011L2.64551 12L2.64199 11.9965C1.43311 10.7225 0.690613 9.00116 0.690613 7.10603H1.32266C1.32302 8.83162 1.99868 10.3996 3.09959 11.5607L3.10064 11.5618L3.1017 11.5625C3.26032 11.4228 3.42493 11.2902 3.59552 11.1647L3.59517 11.164L3.58778 11.1569L3.5614 11.1295V11.1291C2.56637 10.0813 1.95472 8.6649 1.95472 7.10603H2.58677C2.58677 8.55305 3.17732 9.8622 4.13014 10.8066L4.13085 10.8073C4.32043 10.693 4.51493 10.5875 4.71471 10.4907L4.71366 10.4897V10.49L4.66899 10.4482L4.66793 10.4475C3.77595 9.61211 3.21847 8.42397 3.21847 7.10603H3.85017C3.85087 8.36769 4.44353 9.49147 5.36576 10.2139L5.36787 10.215C5.6292 10.1197 5.89862 10.0391 6.17332 9.9744L6.14729 9.98073C5.15226 9.40917 4.48257 8.33568 4.48257 7.10603H5.11462C5.11462 8.58717 6.31542 9.78798 7.79654 9.78798C9.27766 9.78798 10.4788 8.58717 10.4788 7.10603H11.1101C11.1101 8.93573 9.62657 10.4197 7.79654 10.42V10.4204H7.79513C4.22089 10.4211 1.32302 13.3197 1.32302 16.8937L1.27764 16.894H1.32302C1.32302 20.4687 4.22159 23.368 7.79654 23.368C11.3715 23.368 14.2701 20.4687 14.2701 16.894H14.2813H14.2701C14.2701 15.0643 15.755 13.58 17.5847 13.58C21.1597 13.58 24.0586 10.6807 24.0586 7.10603H24.6903C24.6903 9.00256 23.9475 10.7257 22.7358 12C23.9475 13.274 24.6907 14.9978 24.6907 16.894H24.0586C24.0586 15.1674 23.3822 13.599 22.2803 12.4383C22.1223 12.5779 21.9567 12.7105 21.7861 12.8361C22.8019 13.8871 23.4262 15.3179 23.4262 16.894H22.7948C22.7948 15.4466 22.2046 14.1378 21.2511 13.1934L21.2525 13.1924C21.0629 13.3074 20.8677 13.4129 20.6676 13.51C21.586 14.3471 22.1624 15.5532 22.1624 16.894H21.5311C21.5311 15.6316 20.9374 14.5075 20.0148 13.7854L20.0169 13.7844C19.7623 13.8769 19.5006 13.9556 19.2333 14.019H19.2336C20.2287 14.5909 20.8987 15.6644 20.8987 16.894H20.2673C20.2663 15.4132 19.0658 14.2121 17.5847 14.2121V14.2117C16.105 14.2117 14.9042 15.4115 14.9025 16.8908V16.894H14.9021V16.8944L14.9025 16.894V16.8979Z"
                fill="#181A33"
              />
              <path
                d="M37.0957 14.25H35.0107V18H33.3607V7.22998H37.0957C38.3257 7.22998 39.2957 7.53498 40.0057 8.14498C40.7157 8.74499 41.0707 9.59999 41.0707 10.71C41.0707 11.83 40.7107 12.7 39.9907 13.32C39.2807 13.94 38.3157 14.25 37.0957 14.25ZM37.0807 8.62499H35.0107V12.855H37.0807C37.8107 12.855 38.3807 12.67 38.7907 12.3C39.2107 11.92 39.4207 11.395 39.4207 10.725C39.4207 10.065 39.2107 9.54999 38.7907 9.17999C38.3807 8.80999 37.8107 8.62499 37.0807 8.62499ZM47.2696 18V16.77C46.7596 17.69 45.9096 18.15 44.7196 18.15C43.8896 18.15 43.2246 17.935 42.7246 17.505C42.2346 17.065 41.9896 16.48 41.9896 15.75C41.9896 14.17 43.1946 13.38 45.6046 13.38C46.0746 13.38 46.5696 13.41 47.0896 13.47V12.885C47.0896 12.315 46.9446 11.875 46.6546 11.565C46.3646 11.255 45.9546 11.1 45.4246 11.1C44.8746 11.1 44.4346 11.255 44.1046 11.565C43.7846 11.875 43.6146 12.31 43.5946 12.87H42.2146C42.2546 11.98 42.5646 11.265 43.1446 10.725C43.7346 10.175 44.4946 9.89999 45.4246 9.89999C46.4046 9.89999 47.1646 10.165 47.7046 10.695C48.2546 11.215 48.5296 11.95 48.5296 12.9V18H47.2696ZM43.4296 15.705C43.4296 16.115 43.5696 16.445 43.8496 16.695C44.1396 16.945 44.5296 17.07 45.0196 17.07C45.6496 17.07 46.1496 16.89 46.5196 16.53C46.8996 16.16 47.0896 15.67 47.0896 15.06V14.415C46.6196 14.355 46.1546 14.325 45.6946 14.325C44.1846 14.325 43.4296 14.785 43.4296 15.705ZM52.0852 18H50.5552V7.22998H52.0852V18ZM57.368 21.06C56.328 21.06 55.488 20.8 54.848 20.28C54.218 19.76 53.883 19.05 53.843 18.15H55.313C55.353 18.7 55.548 19.12 55.898 19.41C56.248 19.71 56.733 19.86 57.353 19.86C58.033 19.86 58.548 19.68 58.898 19.32C59.258 18.96 59.438 18.44 59.438 17.76V16.32C59.218 16.8 58.893 17.175 58.463 17.445C58.033 17.705 57.548 17.835 57.008 17.835C56.018 17.835 55.203 17.465 54.563 16.725C53.933 15.985 53.618 15.03 53.618 13.86C53.618 12.68 53.923 11.725 54.533 10.995C55.153 10.265 55.963 9.89999 56.963 9.89999C58.123 9.89999 58.983 10.42 59.543 11.46V10.05H60.953V17.73C60.953 18.77 60.633 19.585 59.993 20.175C59.363 20.765 58.488 21.06 57.368 21.06ZM55.718 11.925C55.338 12.395 55.148 13.04 55.148 13.86C55.148 14.68 55.338 15.33 55.718 15.81C56.098 16.28 56.618 16.515 57.278 16.515C57.928 16.515 58.448 16.28 58.838 15.81C59.238 15.33 59.438 14.695 59.438 13.905C59.438 13.085 59.238 12.43 58.838 11.94C58.448 11.45 57.928 11.205 57.278 11.205C56.628 11.205 56.108 11.445 55.718 11.925ZM67.8653 18V16.77C67.3553 17.69 66.5053 18.15 65.3153 18.15C64.4853 18.15 63.8203 17.935 63.3203 17.505C62.8303 17.065 62.5853 16.48 62.5853 15.75C62.5853 14.17 63.7903 13.38 66.2003 13.38C66.6703 13.38 67.1653 13.41 67.6853 13.47V12.885C67.6853 12.315 67.5403 11.875 67.2503 11.565C66.9603 11.255 66.5503 11.1 66.0203 11.1C65.4703 11.1 65.0303 11.255 64.7003 11.565C64.3803 11.875 64.2103 12.31 64.1903 12.87H62.8103C62.8503 11.98 63.1603 11.265 63.7403 10.725C64.3303 10.175 65.0903 9.89999 66.0203 9.89999C67.0003 9.89999 67.7603 10.165 68.3003 10.695C68.8503 11.215 69.1253 11.95 69.1253 12.9V18H67.8653ZM64.0253 15.705C64.0253 16.115 64.1653 16.445 64.4453 16.695C64.7353 16.945 65.1253 17.07 65.6153 17.07C66.2453 17.07 66.7453 16.89 67.1153 16.53C67.4953 16.16 67.6853 15.67 67.6853 15.06V14.415C67.2153 14.355 66.7503 14.325 66.2903 14.325C64.7803 14.325 64.0253 14.785 64.0253 15.705ZM72.6659 18H71.1509V7.22998H72.6659V13.605L76.0709 10.05H77.8559L74.1809 13.905L78.2009 18H76.2509L72.6659 14.235V18ZM83.8614 18V16.77C83.3514 17.69 82.5014 18.15 81.3114 18.15C80.4814 18.15 79.8164 17.935 79.3164 17.505C78.8264 17.065 78.5814 16.48 78.5814 15.75C78.5814 14.17 79.7864 13.38 82.1964 13.38C82.6664 13.38 83.1614 13.41 83.6814 13.47V12.885C83.6814 12.315 83.5364 11.875 83.2464 11.565C82.9564 11.255 82.5464 11.1 82.0164 11.1C81.4664 11.1 81.0264 11.255 80.6964 11.565C80.3764 11.875 80.2064 12.31 80.1864 12.87H78.8064C78.8464 11.98 79.1564 11.265 79.7364 10.725C80.3264 10.175 81.0864 9.89999 82.0164 9.89999C82.9964 9.89999 83.7564 10.165 84.2964 10.695C84.8464 11.215 85.1214 11.95 85.1214 12.9V18H83.8614ZM80.0214 15.705C80.0214 16.115 80.1614 16.445 80.4414 16.695C80.7314 16.945 81.1214 17.07 81.6114 17.07C82.2414 17.07 82.7414 16.89 83.1114 16.53C83.4914 16.16 83.6814 15.67 83.6814 15.06V14.415C83.2114 14.355 82.7464 14.325 82.2864 14.325C80.7764 14.325 80.0214 14.785 80.0214 15.705ZM88.677 18H87.147V7.22998H88.677V18ZM92.2948 18H90.7798V7.22998H92.2948V13.605L95.6998 10.05H97.4848L93.8098 13.905L97.8298 18H95.8798L92.2948 14.235V18ZM103.86 14.73V10.05H105.375V18H103.965V16.74C103.755 17.16 103.43 17.5 102.99 17.76C102.55 18.02 102.065 18.15 101.535 18.15C100.705 18.15 100.045 17.9 99.5551 17.4C99.0651 16.9 98.8201 16.155 98.8201 15.165V10.05H100.335V14.865C100.335 15.525 100.485 16.015 100.785 16.335C101.085 16.655 101.495 16.815 102.015 16.815C102.535 16.815 102.97 16.62 103.32 16.23C103.68 15.84 103.86 15.34 103.86 14.73ZM109.009 18H107.479V7.22998H109.009V18ZM115.927 18V16.77C115.417 17.69 114.567 18.15 113.377 18.15C112.547 18.15 111.882 17.935 111.382 17.505C110.892 17.065 110.647 16.48 110.647 15.75C110.647 14.17 111.852 13.38 114.262 13.38C114.732 13.38 115.227 13.41 115.747 13.47V12.885C115.747 12.315 115.602 11.875 115.312 11.565C115.022 11.255 114.612 11.1 114.082 11.1C113.532 11.1 113.092 11.255 112.762 11.565C112.442 11.875 112.272 12.31 112.252 12.87H110.872C110.912 11.98 111.222 11.265 111.802 10.725C112.392 10.175 113.152 9.89999 114.082 9.89999C115.062 9.89999 115.822 10.165 116.362 10.695C116.912 11.215 117.187 11.95 117.187 12.9V18H115.927ZM112.087 15.705C112.087 16.115 112.227 16.445 112.507 16.695C112.797 16.945 113.187 17.07 113.677 17.07C114.307 17.07 114.807 16.89 115.177 16.53C115.557 16.16 115.747 15.67 115.747 15.06V14.415C115.277 14.355 114.812 14.325 114.352 14.325C112.842 14.325 112.087 14.785 112.087 15.705ZM124.028 18V16.77C123.517 17.69 122.667 18.15 121.477 18.15C120.647 18.15 119.982 17.935 119.482 17.505C118.992 17.065 118.747 16.48 118.747 15.75C118.747 14.17 119.952 13.38 122.362 13.38C122.832 13.38 123.327 13.41 123.848 13.47V12.885C123.848 12.315 123.702 11.875 123.412 11.565C123.122 11.255 122.712 11.1 122.182 11.1C121.632 11.1 121.192 11.255 120.862 11.565C120.542 11.875 120.372 12.31 120.352 12.87H118.972C119.012 11.98 119.322 11.265 119.902 10.725C120.492 10.175 121.252 9.89999 122.182 9.89999C123.162 9.89999 123.923 10.165 124.463 10.695C125.013 11.215 125.288 11.95 125.288 12.9V18H124.028ZM120.187 15.705C120.187 16.115 120.327 16.445 120.607 16.695C120.897 16.945 121.287 17.07 121.777 17.07C122.407 17.07 122.907 16.89 123.277 16.53C123.657 16.16 123.848 15.67 123.848 15.06V14.415C123.377 14.355 122.912 14.325 122.452 14.325C120.942 14.325 120.187 14.785 120.187 15.705ZM131.725 16.53V17.865C131.305 18.055 130.855 18.15 130.375 18.15C129.605 18.15 128.995 17.94 128.545 17.52C128.105 17.09 127.885 16.45 127.885 15.6V11.34H126.13V10.05H127.885V7.69498H129.4V10.05H131.8V11.34H129.4V15.255C129.4 16.245 129.845 16.74 130.735 16.74C131.105 16.74 131.435 16.67 131.725 16.53ZM139.146 16.98C138.406 17.76 137.476 18.15 136.356 18.15C135.236 18.15 134.306 17.76 133.566 16.98C132.826 16.19 132.456 15.205 132.456 14.025C132.456 12.845 132.826 11.865 133.566 11.085C134.306 10.295 135.236 9.89999 136.356 9.89999C137.476 9.89999 138.406 10.295 139.146 11.085C139.886 11.865 140.256 12.845 140.256 14.025C140.256 15.205 139.886 16.19 139.146 16.98ZM134.691 16.065C135.131 16.565 135.686 16.815 136.356 16.815C137.026 16.815 137.581 16.565 138.021 16.065C138.471 15.555 138.696 14.875 138.696 14.025C138.696 13.175 138.471 12.5 138.021 12C137.581 11.5 137.026 11.25 136.356 11.25C135.686 11.25 135.131 11.5 134.691 12C134.251 12.5 134.031 13.175 134.031 14.025C134.031 14.875 134.251 15.555 134.691 16.065ZM143.315 13.935V18H141.8V10.05H143.21V11.73C143.49 11.18 143.905 10.745 144.455 10.425C145.015 10.105 145.62 9.94499 146.27 9.94499V11.52C145.38 11.47 144.665 11.65 144.125 12.06C143.585 12.46 143.315 13.085 143.315 13.935ZM148.631 16.92C148.631 17.26 148.521 17.54 148.301 17.76C148.091 17.97 147.816 18.075 147.476 18.075C147.136 18.075 146.856 17.97 146.636 17.76C146.426 17.54 146.321 17.26 146.321 16.92C146.321 16.57 146.426 16.285 146.636 16.065C146.856 15.845 147.136 15.735 147.476 15.735C147.816 15.735 148.091 15.845 148.301 16.065C148.521 16.285 148.631 16.57 148.631 16.92ZM153.523 18.15C152.373 18.15 151.443 17.77 150.733 17.01C150.033 16.24 149.683 15.23 149.683 13.98C149.683 12.8 150.038 11.825 150.748 11.055C151.468 10.285 152.378 9.89999 153.478 9.89999C154.668 9.89999 155.608 10.33 156.298 11.19C156.998 12.04 157.283 13.11 157.153 14.4H151.228C151.288 15.21 151.513 15.84 151.903 16.29C152.303 16.74 152.833 16.965 153.493 16.965C154.053 16.965 154.518 16.82 154.888 16.53C155.268 16.24 155.523 15.835 155.653 15.315H157.153C156.963 16.195 156.543 16.89 155.893 17.4C155.253 17.9 154.463 18.15 153.523 18.15ZM153.448 11.04C152.838 11.04 152.338 11.25 151.948 11.67C151.558 12.08 151.323 12.655 151.243 13.395H155.548C155.508 12.665 155.303 12.09 154.933 11.67C154.563 11.25 154.068 11.04 153.448 11.04ZM161.887 18.15C160.737 18.15 159.807 17.77 159.097 17.01C158.397 16.24 158.047 15.23 158.047 13.98C158.047 12.8 158.402 11.825 159.112 11.055C159.832 10.285 160.742 9.89999 161.842 9.89999C163.032 9.89999 163.972 10.33 164.662 11.19C165.362 12.04 165.647 13.11 165.517 14.4H159.592C159.652 15.21 159.877 15.84 160.267 16.29C160.667 16.74 161.197 16.965 161.857 16.965C162.417 16.965 162.882 16.82 163.252 16.53C163.632 16.24 163.887 15.835 164.017 15.315H165.517C165.327 16.195 164.907 16.89 164.257 17.4C163.617 17.9 162.827 18.15 161.887 18.15ZM161.812 11.04C161.202 11.04 160.702 11.25 160.312 11.67C159.922 12.08 159.687 12.655 159.607 13.395H163.912C163.872 12.665 163.667 12.09 163.297 11.67C162.927 11.25 162.432 11.04 161.812 11.04Z"
                fill="#181A33"
              />
            </svg>
          </Link>
          <a
            href="mailto:info@arveldaja.com"
            className="font-semibold text-sm underline underline-offset-4"
          >
            info@arveldaja.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
