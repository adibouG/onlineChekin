import { createMachine, interpret, assign } from "./node_modules/xstate/dist/xstate.web.js";

const machine = createMachine({
  id: "machine",
  initial: "start",
  context: {
    configuration: null,
    reservation: null
  },
  states: {
    start: {
      on: {
        fetch: "fetchTheme"
      }
    },
    fetchTheme: {
      invoke: {
        id: "fetchTheme",
        src: (context, event) =>
          fetch("./api/fetchTheme").then((data) => data.json()),
        onDone: {
          target: "fetchReservation",
          actions: assign({
            configuration: (_, event) => event.data
          })
        },
        onError: {
        }
      }
    },
    fetchReservation: {
      invoke: {
        id: "fetchReservation",
        src: (context, event) =>
          fetch("./api/fetchReservation").then((data) => data.json()),
        onDone: {
          target: "startCheckin",
          actions: assign({
            reservation: (_, event) => event.data
          })
        },
        onError: {
        }
      }
    },
    startCheckin: {
    }
  }
});

const navbar = document.getElementById("navbar");
const title = document.getElementById("title");
const content = document.getElementById("content");
const service = interpret(machine);

service
    .onTransition((state) => {
        switch (state.value) {
          case "start":
            console.log("Start");
            service.send("fetch");
            break;
          case "fetchTheme":
            console.log("Fetch theme");
            break;
          case "fetchReservation":
            console.log("Fetch reservation");
            overrideBackgroundColor(navbar, state.context.configuration.theme.colors.primaryBackground);
            overrideColor(title, state.context.configuration.theme.colors.primaryText);
            title.innerText = state.context.configuration.title;
            break;
          case "startCheckin":
            console.log("Start check-in");
            content.innerHTML = `<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title text-center">${state.context.reservation.guest.firstName + ' ' + state.context.reservation.guest.lastName}</h5></div></div>`;
            break;
          default:
            break;
        }
    })
    .start();


function overrideBackgroundColor(element, value) {
  overrideStyle(element, "background-color", value);
}

function overrideColor(element, value) {
  overrideStyle(element, "color", value);
}

function overrideStyle(element, key, value) {
  element.setAttribute('style', `${key}: ${value} !important`);
}
