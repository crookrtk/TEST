import Roact from "@rbxts/roact";
import { Spring } from "@rbxts/flipper";
import { pure } from "@rbxts/roact-hooked";
import { useDelayedEffect, useSingleMotor } from "@rbxts/roact-hooked-plus";

import Button from "components/Button";
import Tooltip from "components/Tooltip";
import { CARD_INNER_MARGIN } from "constants/app";
import { DropshadowBlur } from "components/Dropshadow";
import { ProfileState, selectSwitchEnabled, toggleProfileSwitch } from "reducers/profile";
import { usePageOpen } from "hooks/use-page-open";
import { useRootDispatch, useRootSelector } from "hooks/use-root-store";
import { useTheme } from "hooks/use-theme";

export const SWITCH_WIDTH = 60;
export const SWITCH_HEIGHT = 50;
export const SWITCH_PADDING = 14;

interface Props extends Roact.PropsWithChildren {
	name: keyof ProfileState["switches"];
	order: number;
	tooltip: string;
	tooltipAlignment?: "left" | "right" | "center";
	icon: string;
	position: UDim2;
}

function ProfileSwitch({ order, name, tooltip, tooltipAlignment, icon, position, [Roact.Children]: children }: Props) {
	const dispatch = useRootDispatch();

	const visible = usePageOpen("Home");
	const styles = useTheme((theme) => theme.profile);
	const enabled = useRootSelector((state) => selectSwitchEnabled(state, name));

	const [visibility, setGoal] = useSingleMotor(visible ? 1 : 0);
	useDelayedEffect(
		() => {
			setGoal(new Spring(visible ? 1 : 0, { frequency: 5 }));
		},
		visible ? 200 + order * 50 : 200,
		[visible],
	);

	// Position for show and hide transition
	const positionHidden = new UDim2(position.X, position.Y.add(new UDim(0, SWITCH_HEIGHT + CARD_INNER_MARGIN * 2)));

	return (
		<Button.Root
			onClick={() => dispatch(toggleProfileSwitch(name, !enabled))}
			active={enabled}
			style={styles.switches[name]}
			size={new UDim2(0, SWITCH_WIDTH, 0, SWITCH_HEIGHT)}
			position={visibility.map((n) => positionHidden.Lerp(position, n))}
		>
			<Button.Shadow
				blur={DropshadowBlur.Medium}
				scale={0.75}
				size={new UDim2(1, 32, 1, 30)}
				position={new UDim2(0.5, 0, 1, 20)}
			/>
			<Button.Body />
			<Button.Icon image={icon} size={new UDim2(0, 36, 0, 36)} />

			<Tooltip caption={tooltip} style={styles.switches[name]} alignment={tooltipAlignment} />

			{children}
		</Button.Root>
	);
}

export default pure(ProfileSwitch);
