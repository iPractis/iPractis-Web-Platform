import ActionButton from "../../Shared/ActionButton";
import SocialConnectButton from "../../Shared/SocialConnectButton";
import SectionContent from "../../Shared/SectionContent";
import CardItem from "./CardItem";

// Icons
import { LightningBoltIcon, MailSmallIcon, PayPalIcon, PayPalLargeIcon } from "../../Icons";
import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";

const PaymentMethod = () => {
	// Sample data - in real app this would come from API/props
	const cards = [
		{
			id: 1,
			type: "mastercard",
			lastFour: "7649",
		},
	];

	return (
		<SectionContent className="space-y-[50px]">
			{/* Add a credit or debit card button */}
			<ActionButton
				IconComponent={MailSmallIcon}
				label="Add a credit or debit card"
				onClick={() => {}}
                inputBarStatusClassName={getInputStatusBorder("test", "test", "test")}
				className=""
			/>

			{/* Your cards section */}
			{cards.length > 0 && (
				<div className="space-y-[16px]">
					<h3 className="MT-SB-1 text-primary-color-P4 ps-1.5">Your cards</h3>
					<div className="space-y-[16px]">
						{cards.map((card) => (
							<CardItem key={card.id} card={card} />
						))}
					</div>
				</div>
			)}

			{/* PayPal and Wise integration */}
			<div className="space-y-[16px]">
				<SocialConnectButton
					IconComponent={PayPalLargeIcon}
					label="Associate with PayPal"
					isConnected={false}
					disabled={false}
					onClick={() => {}}
				/>
				<SocialConnectButton
					IconComponent={LightningBoltIcon}
					label="Associate with Wise"
					isConnected={false}
					disabled={false}
					onClick={() => {}}
				/>
			</div>
		</SectionContent>
	);
};

export default PaymentMethod;
