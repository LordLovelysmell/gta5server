const module = {
  namespaced: true,
  state: {
    dialogues: {
      dialogue_1: {
        text: "Здравствуйте, меня зовут Jada Stevens. Чем я могу Вам помочь?",
        options: [
          {
            text: "Что это за место?",
            state: "dialogue_2",
          },
          {
            text: "Хочу оформить банковскую карту",
            state: "dialogue_3",
          },
        ],
      },
      dialogue_2: {
        text: "Cберегательный банк округа Блейн Каунти. У нас можно оформить банковскую депозитную карту.",
        options: [
          {
            text: "Отлично, давайте оформим",
            state: "dialogue_3",
          },
        ],
      },
      dialogue_3: {
        text: "Конечно. Мне нужен Ваш паспорт и буквально пару минут времени, для того чтобы заполнить всю необходимую информацию о вас в нашей банковской системе.",
        options: [
          {
            text: "*Протянуть паспорт*",
            state: "dialogue_4",
          },
          {
            text: "Понятно, зайду позже.",
            state: "dialogue_5",
          },
        ],
      },
      dialogue_4: {
        text: "*Заполняет данные паспорта* Отлично, все готово, вот Ваша банковская карта. При активации Вам нужно будет указать PIN-код из 4-х цифр. Спасибо, что выбрали нас!",
        options: [
          {
            text: "...",
            state: "dialogue_release_card",
          },
          {
            text: "Благодарю, до свидания.",
            state: "dialogue_release_card",
          },
        ],
      },
      dialogue_5: {
        text: "Будем Вас ждать!",
        options: [
          {
            text: "Ага, конечно...",
            state: "dialogue_end",
          },
          {
            text: "Спасибо, до свидания.",
            state: "dialogue_end",
          },
        ],
      },
    },
  },
  mutations: {},
  getters: {
    dialogues: (state) => state.dialogues,
  },
};

export default module;
