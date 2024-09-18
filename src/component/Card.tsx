interface TCardData {
  CardData: PCardData;
}
interface PCardData {
  title: string;
  Desc: string;
  iconclass: string;
  linkurls?: string[];
}

const Card = ({ CardData }: TCardData) => {
  function truncate(str: string) {
    return str.length > 10 ? str.substring(0, 100) + "..." + " " : str;
  }

  return (
    <div className="card border-0">
      <div className="card-body row bg-color">
        <div className="icon pr-3 col-lg-1">
          <i className={CardData.iconclass}></i>
        </div>
        <div className="col-lg-10">
          <h5 className="card-title ">{CardData.title}</h5>
          <p className="card-text font-size-point-875-rem ">
            {truncate(CardData.Desc)}

            {CardData?.linkurls?.map((links, key) => {
              if (key < 1) {
                return (
                  <a href={links} target="_blank" key={key} rel="noreferrer">
                    Read More
                  </a>
                );
              }
              return <></>;
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
