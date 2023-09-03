import "./Card.css";

export const Card = (props) => {
  const { title, thumbnail, channelTitle } = props;

  return (
    <li className="card">
      <section>
        <img
          src={thumbnail?.url}
          height={180}
          width={320}
          alt=""
          className="thumbnail"
        />
      </section>
      <section className="details">
        <div className="title">{title}</div>
        <div className="channel-title">{channelTitle}</div>
      </section>
    </li>
  );
};
