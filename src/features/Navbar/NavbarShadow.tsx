import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";

import Dropshadow, { DropshadowBlur } from "components/Dropshadow";
import Gradient from "components/Gradient";
import { Theme, asColor, asColorSequence, asTransparency } from "reducers/themes";
import { getColorInSequence } from "utils/color-util";

interface Props {
	style: Theme["navbar"];
	pageNumber: Roact.Binding<number>;
}

function NavbarShadow({ style, pageNumber }: Props) {
	return (
		<>
			{/* Navbar dropshadow */}
			<Dropshadow
				blur={DropshadowBlur.Large}
				scale={1.1}
				color={asColor(style.dropshadow)}
				transparency={asTransparency(style.dropshadow)}
				size={new UDim2(1, 100, 1, 42)}
				position={new UDim2(0.5, 0, 1, 70)}
			>
				<Gradient color={style.dropshadow} />
			</Dropshadow>

			{/* Progress indicator glow */}
			<Dropshadow
				blur={DropshadowBlur.Large}
				scale={0.8}
				color={pageNumber.map((n) => getColorInSequence(asColorSequence(style.accent), n / 4 + 0.125))}
				transparency={asTransparency(style.accent)}
				size={new UDim2(0.25, 70, 1, 70)}
				position={pageNumber.map((n) => new UDim2(n / 4 + 0.125, 0, 1, 40))}
			/>
		</>
	);
}

export default hooked(NavbarShadow);
