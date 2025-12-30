// Icons
import { CardPaymentIcon, PencilEditIcon, CloseXIcon } from "../../Icons";

const CardItem = ({ card, onEdit, onDelete }) => {
  const getCardIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "mastercard":
        return <CardPaymentIcon fillcolor="fill-primary-color-P1" width={20} height={20} />;
      default:
        return <CardPaymentIcon fillcolor="fill-primary-color-P1" width={20} height={20} />;
    }
  };

  return (
    <div className="flex items-center justify-between bg-secondary-color-S11 p-[6px] rounded-[16px] gap-[8px]">
      <div className="bg-primary-color-P12 rounded-[10px] p-[8px]">
        {getCardIcon(card.type)}
      </div>
        <span className="flex-1 min-w-0 bg-primary-color-P12 rounded-[10px] h-[36px] flex items-center px-[12px] text-primary-color-P4">
          <span className="ST-SB-2">{(() => {
              const cardTypes = { mastercard: "Mastercard", visa: "Visa", amex: "American Express" };
              return cardTypes[card.type?.toLowerCase()] || "Card";
          })()}</span>
          <span className="ST-2">&nbsp;ending in&nbsp;</span>
          <span className="ST-SB-2">{card.lastFour}</span>
        </span>

      <div className="flex items-center gap-[8px]">
        {/* Edit button */}
        <button
          type="button"
          onClick={onEdit}
          className="bg-primary-color-P12 hover:bg-secondary-color-S8 rounded-[10px] p-[8px] transition-colors duration-200"
        >
          <PencilEditIcon fillcolor="fill-primary-color-P1" width={20} height={20} />
        </button>

        {/* Delete button */}
        <button
          type="button"
          onClick={onDelete}
          className="bg-primary-color-P12 hover:bg-secondary-color-S8 rounded-[10px] p-[8px] transition-colors duration-200"
        >
          <CloseXIcon fillcolor="stroke-primary-color-P1" width={20} height={20} />
        </button>
      </div>
    </div>
  );
};

export default CardItem;
