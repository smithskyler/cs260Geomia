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
      console.log("Register ==>");
      console.log(name);
      axios.post("/api/register/" + info.name).then(response => {
        console.log(" <== Registered!");
        context.commit('setRegistered', true);
        context.commit('setOpponent', undefined);
        context.commit('setShape', -1);
        return true;
      }).catch(err => {
        console.log(" <== Register Failed…");
      });
    },

    getOpponent(context, name) {
      console.log("Get Opponent ==>");
      axios.get("/api/opponent/" + name.name).then(response => {
        console.log(" <== Get Opponent");
        console.log(response.data);
        context.commit('setOpponent', response.data);
        return true;
      }).catch(err => {
        console.log(" <== Has Opponent Failed…");
      });
    },

    fight(context, info) {
      console.log("Fight ==>");
      axios.put("/api/fight/" + info.name, info).then(response => {
        console.log(" <== Fight " + response.data);
        context.commit('setShape', response.data);
        return true
      }).catch(err => {
        console.log(" <== Fight Failed…");
      });
    },

    // playAgain(context, info) {
    //   console.log("Replay ==>");
    //   axios.post("/api/register/", info.name).then(response => {
    //     context.commit('setOpponent', undefined);
    //     context.commit('setShape', -1);
    //     console.log(" <== Replay")
    //   }).catch(err => {
    //     console.log(" <== Replay Failed…")
    //   })
    // },

    unregister(context, info) {
      console.log("unregister ==>");
      axios.delete("/api/player/" + info.name).then(response => {
        console.log(" <== unregister")
        context.commit('setRegistered', false);
      }).catch(err => {
        console.log(" <== unregister Failed…")
      })
    },
  },
});
