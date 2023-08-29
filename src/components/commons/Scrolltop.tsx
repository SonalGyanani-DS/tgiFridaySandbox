/** Custom stroller For location list */
export const Scroll = {
  scrollToRow(index: number) {
    const result: { offsetTop: number } = [].slice.call(
      document.querySelectorAll(`.result`) || []
    )[0];
    const offset: { offsetTop: number } = [].slice.call(
      document.querySelectorAll(`.result`) || []
    )[index];

    const o = offset.offsetTop - result.offsetTop;

    [].slice
      .call(document.querySelectorAll(".scrollbar-container") || [])
      .forEach(function (el: HTMLElement) {
        el.scrollTop = o;
      });
  },
};
