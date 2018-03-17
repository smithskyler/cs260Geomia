Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    registered: false,
    opponent: undefined,
    selected_shape: -1,
  },

  getters: {
    opponent: state => state.opponent,
    registered: state => state.registered,
    selected_shape: state => state.selected_shape,
  },

  mutations: {
    setRegistered(state, registered) {
      state.registered = registered;
    },
    setOpponent(state, opponent) {
      state.opponent = opponent;
    },
    setShape(state, shape) {
      state.selected_shape = shape;
    },
  },

  actions: {
    register(context, info) {
      axios.post("/api/register/" + info.name).then(response => {
        context.commit('setRegistered', true);
        context.commit('setOpponent', undefined);
        context.commit('setShape', -1);
        return true;
      }).catch(err => {
        console.log(" <== Register Failed…");
      });
    },

    getOpponent(context, name) {
      axios.get("/api/opponent/" + name.name).then(response => {
        context.commit('setOpponent', response.data);
        return true;
      }).catch(err => {
        console.log(" <== Get Opponent Failed…");
      });
    },

    fight(context, info) {
      axios.put("/api/fight/" + info.name, info).then(response => {
        context.commit('setShape', response.data);
        return true
      }).catch(err => {
        console.log(" <== Fight Failed…");
      });
    },

    unregister(context, info) {
      axios.delete("/api/player/" + info.name).then(response => {
        context.commit('setRegistered', false);
      }).catch(err => {
        console.log(" <== unregister Failed…")
      })
    },
  },
});
