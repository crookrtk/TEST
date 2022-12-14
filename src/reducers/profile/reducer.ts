import { ProfileAction } from "./action";
import { ProfileState } from "./model";

const initialState: ProfileState = {
	sliders: {
		flightspeed: { value: 50, enabled: false },
		walkspeed: { value: 50, enabled: false },
		jumpheight: { value: 150, enabled: false },
	},
	switches: {
		respawn: { enabled: false },
		ghostmode: { enabled: false },
		godmode: { enabled: false },
		freecam: { enabled: false },
	},
};

export default function profileReducer(state = initialState, action: ProfileAction): ProfileState {
	switch (action.type) {
		case "UPDATE_PROFILE_SLIDER":
			return {
				...state,
				sliders: {
					...state.sliders,
					[action.key]: {
						...state.sliders[action.key],
						value: action.value,
					},
				},
			};
		case "TOGGLE_PROFILE_SLIDER":
			return {
				...state,
				sliders: {
					...state.sliders,
					[action.key]: {
						...state.sliders[action.key],
						enabled: action.enabled,
					},
				},
			};
		case "TOGGLE_PROFILE_SWITCH":
			return {
				...state,
				switches: {
					...state.switches,
					[action.key]: {
						...state.switches[action.key],
						enabled: action.enabled,
					},
				},
			};
		default:
			return state;
	}
}
