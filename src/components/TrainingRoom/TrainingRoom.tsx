import css from "./TrainingRoom.module.css";
import Icon from "../common/Icon";

const TrainingRoom = () => {
  return (
    <section>
      <div>
        <div>
          <div>
            <Icon iconName="ua" className={css.icon} />
            <p>Ukrainian</p>
          </div>
        </div>
        <div>
          <div>
            <Icon iconName="uk" className={css.icon} />
            <p>English</p>
          </div>
        </div>
      </div>
      <div>
        <button type="submit">Save</button>
        <button>Cancel</button>
      </div>
    </section>
  );
};

export default TrainingRoom;
