import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', async event => {
  event.preventDefault();

  const delay = parseInt(form.delay.value);
  const step = parseInt(form.step.value);
  const amount = parseInt(form.amount.value);

  for (let i = 1; i <= amount; i++) {
    const position = i;
    const promiseDelay = delay + (i - 1) * step;

    try {
      const { delay } = await createPromise(position, promiseDelay);

      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } catch ({ position, delay }) {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.3
        ? resolve({ position, delay })
        : reject({ position, delay });
    }, delay);
  });
}
