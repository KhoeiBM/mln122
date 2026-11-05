import { chapterLabel } from '../../content/chapters';
import { MILESTONES } from '../../content/prologue';
import { AXES } from '../../content/scenarios';
import {
  earnedBadges,
  prologueSeenCount,
  scenarioState,
  scenarioStatus,
} from '../../lib/progress';

const SIGNAL_MARK = { len: '▲', xuong: '▼', 'hon-hop': '◆' };

// Hồ sơ là bản ghi những gì người học đã quyết định — không phải bảng điểm.
export default function DossierBody({ progress, scenarios, dateLabel }) {
  const read = prologueSeenCount(progress);
  const badges = earnedBadges(progress, scenarios);
  const earned = badges.filter((badge) => badge.earned).length;

  return (
    <div className="dossier">
      <header className="dossier-head">
        <p className="page-code">Hồ sơ học tập · MLN122</p>
        <h1 className="page-title">Hồ sơ của tôi</h1>
        <p className="page-lead">
          Tất cả dữ liệu dưới đây được lưu trên máy bạn. Không có dữ liệu nào được gửi lên máy chủ
          và không ai chấm điểm những lựa chọn này.
        </p>
        <dl className="dossier-meta">
          <div>
            <dt>Mốc lịch sử đã đọc</dt>
            <dd>{read}/2</dd>
          </div>
          <div>
            <dt>Kịch bản đã hoàn thành</dt>
            <dd>
              {scenarios.filter((scenario) => scenarioStatus(progress, scenario).key === 'xong').length}
              /{scenarios.length}
            </dd>
          </div>
          <div>
            <dt>Huy hiệu</dt>
            <dd>
              {earned}/{badges.length}
            </dd>
          </div>
          {dateLabel ? (
            <div>
              <dt>Ngày in hồ sơ</dt>
              <dd>{dateLabel}</dd>
            </div>
          ) : null}
        </dl>
      </header>

      <section className="dossier-section" aria-labelledby="ho-so-kich-ban">
        <h2 id="ho-so-kich-ban" className="dossier-title">
          Hai kịch bản
        </h2>
        {scenarios.map((scenario) => {
          const state = scenarioState(progress, scenario.id);
          const status = scenarioStatus(progress, scenario);
          const option = scenario.options.find((item) => item.id === state.choice) || null;
          return (
            <article className="dossier-row" key={scenario.id}>
              <div className="dossier-row-head">
                <span className="row-code">{scenario.code}</span>
                <h3 className="dossier-row-title">{scenario.title}</h3>
                <span className={`status status-${status.key}`}>{status.label}</span>
              </div>

              {option ? (
                <>
                  <p className="dossier-choice">
                    Phương án đã ghi: <strong>{option.id}. {option.title}</strong>
                  </p>
                  <ul className="dossier-axes">
                    {AXES.map((axis) => {
                      const cell = option.ledger[axis.key];
                      return (
                        <li key={axis.key}>
                          <span className={`signal signal-${cell.signal}`}>
                            <span aria-hidden="true">{SIGNAL_MARK[cell.signal]}</span> {axis.label}
                          </span>
                          <span className="dossier-axis-text">{cell.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <p className="dossier-empty">Chưa ghi phương án nào.</p>
              )}

              {state.reflection.trim() ? (
                <blockquote className="dossier-reflection">{state.reflection}</blockquote>
              ) : (
                <p className="dossier-empty">Chưa viết phản biện.</p>
              )}
            </article>
          );
        })}
      </section>

      <section className="dossier-section" aria-labelledby="ho-so-huy-hieu">
        <h2 id="ho-so-huy-hieu" className="dossier-title">
          Huy hiệu
        </h2>
        <ul className="badges">
          {badges.map((badge) => (
            <li className={`badge${badge.earned ? ' is-earned' : ''}`} key={badge.id}>
              <span className="badge-label">{badge.label}</span>
              <span className="badge-note">{badge.note}</span>
              <span className="badge-state">{badge.earned ? 'Đã nhận' : 'Chưa nhận'}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="dossier-section" aria-labelledby="ho-so-moc">
        <h2 id="ho-so-moc" className="dossier-title">
          Hai mốc lịch sử
        </h2>
        <ul className="dossier-milestones">
          {MILESTONES.map((milestone) => {
            const isRead = Boolean(progress.prologue && progress.prologue[milestone.id]);
            return (
              <li key={milestone.id}>
                <span className="row-code">{milestone.code}</span>
                <span className="dossier-mile-title">
                  {milestone.year} — {milestone.title}
                </span>
                <span className="dossier-mile-state">{isRead ? 'Đã đọc' : 'Chưa đọc'}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="dossier-section limits" id="gioi-han" aria-labelledby="ho-so-gioi-han">
        <h2 id="ho-so-gioi-han" className="dossier-title">
          Nguồn và giới hạn
        </h2>
        <ul>
          <li>
            Số liệu ở hai mốc lịch sử là bản nháp, cần đối chiếu Niên giám thống kê và văn kiện
            trước khi dùng cho mục đích học thuật. Những con số chưa chốt được ghi rõ là “số nháp”.
          </li>
          <li>
            Hai kịch bản là tình huống hư cấu, dựng từ các quan hệ kinh tế phổ biến. Tên doanh
            nghiệp, nhân vật và con số trong kịch bản không ứng với một tổ chức cụ thể nào.
          </li>
          <li>
            Sản phẩm không chấm điểm lựa chọn. Phần “Góc phân tích” chỉ nêu phạm trù liên quan
            ({chapterLabel(3)}, {chapterLabel(4)}, {chapterLabel(5)}, {chapterLabel(6)}), không kết
            luận phương án nào đúng.
          </li>
          <li>
            Nội dung chưa được giảng viên MLN122 thẩm định; nhóm cần một buổi rà soát với giảng
            viên trước khi trình bày chính thức.
          </li>
          <li>
            Chưa có kiểm thử với người dùng thật ngoài nhóm, nên chưa có số liệu về thời gian học
            thực tế.
          </li>
        </ul>
      </section>
    </div>
  );
}
