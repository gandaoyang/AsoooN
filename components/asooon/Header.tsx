export function Header() {
  return (
    <div className="top">
      <div className="brand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/asooon-logo.png"
          alt="AsoooN"
          className="brand-logo"
          width={56}
          height={56}
        />
        <div className="sub">看见此刻影响你的节奏点滴</div>
      </div>
    </div>
  );
}
