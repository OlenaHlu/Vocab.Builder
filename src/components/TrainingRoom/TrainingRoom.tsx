import css from "./TrainingRoom.module.css";
import Icon from "../common/Icon";

const TrainingRoom = () => {
  return (
    <section>
      <form>
        <div>
          <div className={css.uaPart}>
            <div>
              <input
                type="text"
                //   value={inputValue}
                //   onChange={}
                className={css.input}
                placeholder="Введіть переклад"
              />
            </div>
            <div className={css.langWithAction}>
              <div className={css.actionPart}>
                <p className={css.actionText}>Next</p>
                <button type="button" className={css.actionBtn}>
                  <Icon className={css.iconArrow} iconName="arrow" />
                </button>
              </div>
              <div className={css.langPart}>
                <Icon iconName="ua" className={css.icon} />
                <p className={css.langText}>Ukrainian</p>
              </div>
            </div>
          </div>
          <div className={css.ukPart}>
            <p className={css.ukText}>there will be tasks here later</p>
            <div className={css.langPart}>
              <Icon iconName="uk" className={css.icon} />
              <p className={css.langText}>English</p>
            </div>
          </div>
        </div>
        <div className={css.buttonsContainer}>
          <button type="submit" className={css.saveBtn}>
            Save
          </button>
          <button type="button" className={css.cancelBtn}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default TrainingRoom;
