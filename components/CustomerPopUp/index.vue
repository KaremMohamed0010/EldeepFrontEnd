<template>
  <div
    class="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden"
    :id="`modal${customerId}`"
  >
    <div
      class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-900 opacity-75" />
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
        >&#8203;</span
      >

      <div
        class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[776px] sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <!-- close btn -->
        <div class="px-4 py-3 text-left">
          <button
            type="button"
            class="py-2 px-4 bg-white text-black rounded mr-2 flex"
            @click="toggleModal(customerId, 'close')"
          >
            <img
              class="w-[24px]"
              src="../../assets/imgs/comman/close-square.png"
              alt=""
            />
            <p class="ml-[12px]">
              {{ $t("Close") }}
            </p>
          </button>
        </div>
        <div class="mt-5 flex flex-row items-center px-12">
          <div
            data-tabopen="tab1"
            class="tabbtn border-t-2 border-r-2 cursor-pointer border-l-2 border-purple-600 px-2 py-1 text-purple-700 font-medium"
          >
            Tab 1
          </div>
          <div
            data-tabopen="tab2"
            class="tabbtn border-b-2 cursor-pointer border-purple-600 px-2 py-1"
          >
            Tab 2
          </div>
          <div
            data-tabopen="tab3"
            class="tabbtn border-b-2 cursor-pointer border-purple-600 px-2 py-1"
          >
            Tab 3
          </div>
        </div>

        <div id="tab1" class="tab mt-1 items-center px-12">
          <h2 class="font-semibold text-2xl">Content of Tab 1</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus, blanditiis iste? Dignissimos commodi facilis vel nisi,
            a Latin professor at Hampden-Sydney College in Virginia, looked up
            one of the more obscure Latin words, consectetur, from a Lorem Ipsum
            passage
          </p>
        </div>

        <div id="tab2" class="tab mt-1 items-center px-12 hidden">
          <h2 class="font-semibold text-2xl">Content of Tab 2</h2>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source.
          </p>
        </div>

        <div id="tab3" class="tab mt-1 items-center px-12 hidden">
          <h2 class="font-semibold text-2xl">Content of Tab 3</h2>
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, t
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    customerId : {
        type :Number,
        required : true
    }
  },
  methods: {
      toggleModal(id, status) {
        // show modal
        document.getElementById(`modal${id}`).classList.toggle("hidden");
        // get data by id
        if (status == "open") {
          this.$axios.$get(`/Customer/GetCustomerById/${id}`).then((res) => {
            this.data = res.Customer;
          });
        }
        // Select tabs and tab buttons
        const tabs = document.querySelectorAll(".tab");
        const tabBtns = document.querySelectorAll(".tabbtn");

        // each tab button will have a  click event  listener
        tabBtns.forEach((tabBtn) => {
          tabBtn.addEventListener("click", () => {
            // hiding all tabs
            tabs.forEach((tab) => {
              tab.classList.add("hidden");
            });

            // showing only the tab that this tab button should show
            const tab = tabBtn.getAttribute("data-tabopen");
            document.getElementById(tab).classList.remove("hidden");

            //  we will give same styles to all tab
            tabBtns.forEach((tabBtn) => {
              tabBtn.className =
                "tabbtn border-b-2 border-purple-600  px-2 py-1 cursor-pointer";
            });

            //  we will give special styles to the active tab
            tabBtn.className =
              "tabbtn font-medium border-t-2 border-r-2 border-l-2 border-purple-600 px-2 py-1 text-purple-700 cursor-pointer";
          });
        });
      },
    },
};
</script>
