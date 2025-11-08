import PropTypes from "prop-types";

export default function Card({ title, children }) {
  return (
    <div className="panel">
      {title && (
        <h3
          style={{
            margin: "0 0 6px 0",
            fontSize: "1rem",
            fontWeight: "600",
            color: "var(--text)",
            textAlign: "center",
          }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};