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
    opacity: 1,
    transition: {
      duration: 0.25,
      delay: 0.4,
    },
  },
};

const fadeEffectRight = {
  hidden: {
    x: 40,
    opacity: 0,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
      delay: 0.5,
    },
  },
};

const fadeEffectLeft = {
  hidden: {
    x: -40,
    opacity: 0,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
      delay: 0.5,
    },
  },
};

export { fadeEffect, fadeEffect2, fadeEffectLeft, fadeEffectRight };
