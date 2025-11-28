import DeviceItem from "./DeviceItem";

const Devices = () => {
	return (
		<div className="space-y-[16px]">
			<div className="space-y-[32px]">
				<div className="space-y-2.5">
					<DeviceItem
						device={"MacOS"}
						date={"2024-06-15T10:30:00Z"}
						location={"New York, USA"}
            current
					/>

					<DeviceItem
						device={"Linux"}
						date={"2024-06-14T14:45:00Z"}
						location={"Berlin, Germany"}
					/>

					<DeviceItem
						device={"Windows"}
						date={"2024-06-13T09:15:00Z"}
						location={"Tokyo, Japan"}
					/>
				</div>
			</div>
		</div>
	);
};

export default Devices;
