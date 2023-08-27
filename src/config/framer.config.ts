const fadeEffect = {
  hidden: {
    y: 20,
    opacity: 0,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      delay: 0.4,
    },
  },
};

const fadeEffect2 = {
  hidden: {
    opacity: 0,
  },
  visible: {
    transition: {
      duration: 0.25,
      delay: 0.4,
    },
  },
};

export { fadeEffect, fadeEffect2 };
