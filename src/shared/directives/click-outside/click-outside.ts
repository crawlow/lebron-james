const ClickOutside = {
  beforeMount: (el: any, binding: any) => {
      el.boardClickOutsideEvent = (event: MouseEvent) => {
          // here I check that click was outside the el and his children
          if (!(el == event.target || el.contains(event.target))) {
              // and if it did, call method provided in attribute value
              binding.value(event);
          }
      };
      document.addEventListener("click", el.boardClickOutsideEvent);
  },
  unmounted: (el: any) => {
      document.removeEventListener("click", el.boardClickOutsideEvent);
  },
};

export default ClickOutside;