<template>
  <div>
    <!-- <font-awesome-icon :icon="['fas', 'home']" /> -->
    <div class="lg:flex">
      <div
        class="hidden lg:flex items-center justify-center bg-image flex-1 xl:h-screen"
      >
        <div
          class="max-w-xs transform duration-200 hover:scale-110 cursor-pointer"
        ></div>
      </div>

      <div class="lg:w-1/2 bg-[#EBEBEB] xl:max-w-screen-sm">
        <div
          class="py-12 pt-[10rem] flex justify-center lg:justify-start lg:px-12"
        >
          <div class="cursor-pointer flex items-center appear-in-mobile">
            <div class="flex justify-center">
              <img
                class="w-[50%]"
                src="../assets/imgs/login/Full_Logo.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div
          class="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl"
        >
          <div v-if="loginBtn == false" class="login-card">
            <h2
              :class="{ 'text-right': lang == 'ar' }"
              class="text-center welcome-text lg:text-left xl:text-5xl xl:text-bold"
            >
              {{ $t("Welcome") }}
            </h2>
            <h2
              :class="{ 'text-right': lang == 'ar' }"
              class="text-center welcome-text lg:text-left xl:text-5xl xl:text-bold"
            >
              {{ $t("Please login") }}
            </h2>
            <div class="mt-12">
              <!-- email -->
              <div>
                <div
                  :class="{ 'outline-error': invalidEmail == true }"
                  class="input-form flex focus:border-[#D11C1C]"
                >
                  <img
                    class="w-[12%] p-[12px]"
                    src="../assets/imgs/login/user-square.png"
                    alt=""
                  />
                  <img
                    class="line"
                    src="../assets/imgs/login/line.png"
                    alt=""
                  />
                  <input
                    class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-[#D11C1C]"
                    type="email"
                    v-model="email"
                    :placeholder="$t('Email')"
                  />
                </div>
                <div
                  v-if="invalidEmail"
                  class="error-message mt-[14px] ml-[14px]"
                >
                  {{ $t("Email is Invalid") }}
                </div>
              </div>
              <!-- password -->
              <div class="mt-8">
                <div
                  :class="{
                    'outline-error': errorpasswordValidation == true,
                  }"
                  class="input-form flex focus:border-[#D11C1C]"
                >
                  <img
                    class="w-[12%] p-[12px]"
                    src="../assets/imgs/login/LockKey.png"
                    alt=""
                  />
                  <img
                    class="line"
                    src="../assets/imgs/login/line.png"
                    alt=""
                  />
                  <input
                    v-if="showPassword"
                    class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-[#D11C1C]"
                    type="text"
                    v-model="password"
                    :placeholder="$t('Password')"
                  />
                  <input
                    v-if="showPassword == false"
                    class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-[#D11C1C]"
                    type="password"
                    v-model="password"
                    :placeholder="$t('Password')"
                  />

                  <img
                    v-if="showPassword"
                    class="line cursor-pointer w-[52px]"
                    @click="toggleEyePassword"
                    src="../assets/imgs/login/eye-password-hide-icon-512x512-iv45hct9.png"
                    alt=""
                  />

                  <img
                    v-if="showPassword == false"
                    class="line cursor-pointer w-[52px]"
                    @click="toggleEyePassword"
                    src="../assets/imgs/login/preview-show-interface-icon-free-vector.jpg"
                    alt=""
                  />
                </div>
                <div
                  v-if="errorpasswordValidation"
                  class="error-message mt-[14px] ml-[14px]"
                >
                  {{ $t("Password is Invalid") }}
                </div>
              </div>
              <!-- Forget Password -->
              <div class="flex justify-end pt-[20px]">
                <a
                  class="text-xs font-display font-semibold text-[#D11C1C] hover:text-[#D11C1C] cursor-pointer"
                >
                  {{ $t("Forgot Password?") }}
                </a>
              </div>
              <!-- login btn -->
              <div class="mt-10 flex">
                <button
                  :disabled="login"
                  @click="Login"
                  type="button"
                  class="bg-white login-btn flex justify-center items-center text-[#E9573E] p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-[#E9573E] hover:text-white shadow-lg"
                >
                  <img
                    class="login"
                    src="../assets/imgs/login/ArrowCircleRight.png"
                    alt=""
                  />
                  {{ $t("Log In") }}
                </button>
              </div>
            </div>
          </div>
          <div class="text-[#d11c1c] pt-[33px] pl-[83px]" v-if="userNotFound">
            {{ $t("user not found") }}
          </div>
          <div v-if="loginBtn == true"><Loading :text="'Signing in'" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "IndexPage",

  data() {
    return {
      email: "",
      password: "",
      invalidEmail: false,
      errorpasswordValidation: false,
      showPassword: false,
      emailTimer: null,
      passwrodTimer: null,
      login: false,
      loginBtn: false,
      userNotFound: false,
      lang: "",
    };
  },
  mounted() {
    if (this.$cookies.get("token")) {
      if (localStorage.getItem("role") == "5") {
        this.$router.push("/pricing");
      }
      if (localStorage.getItem("role") == "1") {
        this.$router.push("/dashboard");
      }
      if (localStorage.getItem("role") == "6") {
        this.$router.push("/purchase");
      }
      if (localStorage.getItem("role") == "7") {
        this.$router.push("/financial");
      }
    } else if (!this.$cookies.get("token")) {
      this.$router.push("/");
    }

    this.lang = localStorage.getItem("lang");
    this.lang = localStorage.getItem("lang");
    if (this.lang == "en") {
      this.$i18n.locale = "en";
    } else if (this.lang == "ar") {
      this.$i18n.locale = "ar";
    }
  },
  methods: {
    // // check of validation email
    validateEmail(email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)+$/.test(email)) {
        this.invalidEmail = false;
        this.login = false;
        return;
      } else {
        this.invalidEmail = true;
        this.login = true;
      }
    },
    // is valid password
    isValidPassword() {
      const password =
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
      if (password.test(this.password)) {
        this.errorpasswordValidation = false;
        this.login = false;
        return;
      } else {
        this.errorpasswordValidation = true;
        this.login = true;
      }
    },
    // toggle password
    toggleEyePassword() {
      this.showPassword = !this.showPassword;
    },
    // login api
    Login() {
      this.userNotFound = false;
      if (this.invalidEmail == true || this.errorpasswordValidation == true) {
        return;
      } else {
        this.loginBtn = true;
        let data = {
          email: this.email,
          password: this.password,
        };
        this.$axios.$post("/Auth/Login", data).then((res) => {
          if (res.status == 200) {
            this.$cookies.set("token", res.access_token);
            localStorage.setItem("role", res.user.Role_id);
            localStorage.setItem("token", "Bearer" + res.access_token);
            localStorage.setItem("name", res.user.Name);
            localStorage.setItem("lang", "en");

            localStorage.setItem(
              "permissions",
              JSON.stringify(res.permissions)
            );

            location.reload();
          } else {
            this.loginBtn = false;
            this.userNotFound = true;
          }
        });
      }
    },
  },

  watch: {
    email: {
      handler(value) {
        this.email = value;
        clearTimeout(this.emailTimer);
        // Set a timeout of 3 seconds (3000 milliseconds)
        this.emailTimer = setTimeout(() => {
          this.validateEmail(value);
        }, 2000);
      },
      immediate: false,
    }, // watch changes of passwords
    password: {
      handler(value) {
        this.password = value;
        clearTimeout(this.passwrodTimer);
        // Set a timeout of 3 seconds (3000 milliseconds)
        this.passwrodTimer = setTimeout(() => {
          this.isValidPassword(value);
        }, 2000);
      },
      immediate: false,
    },
  },
};
</script>

<style>
.bg-image {
  background: url("../assets/imgs/login/login.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.appear-in-mobile {
  display: none;
}
/* login card design */
.login-card {
  border-radius: 20px;
  background: var(--white, #fff);
  /* Shadow / 2xl */
  box-shadow: 0px 32px 64px -12px rgba(45, 54, 67, 0.14);
  padding: 20px;
}
/* welcome text */
.welcome-text {
  color: var(--primary-dark, #424242);
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.3px;
}
/* inputs */
.input-form {
  border-radius: 20px;
  border: 1px solid var(--primary-dark-20, rgba(66, 66, 66, 0.2));
  background: var(--colors-base-00, #fff);
  /* Shadow/lg */
  box-shadow: 0px 8px 11px -4px rgba(45, 54, 67, 0.04),
    0px 20px 24px -4px rgba(45, 54, 67, 0.04);
}
/* image line  */
.line {
  padding-top: 10px;
  padding-right: 10px;
  height: 37px;
}
/* login btn */
.login {
  width: 10%;
  padding-right: 12px;
}
/* login-btn */
.login-btn {
  border-radius: 20px;
  border: 1px solid var(--secondary-1, #757777);
  background: var(--white, #fff);
  /* Shadow/lg */
  box-shadow: 0px 8px 11px -4px rgba(45, 54, 67, 0.04),
    0px 20px 24px -4px rgba(45, 54, 67, 0.04);
}
/* media query  */
@media (max-width: 1022px) {
  .appear-in-mobile {
    display: flex;
  }
}
</style>
