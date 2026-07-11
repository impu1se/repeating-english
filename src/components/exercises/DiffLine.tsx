import type { DiffToken } from '../../engine/diff';

// Colors/decoration for data-status live in index.css.
export function DiffLine({ diff }: { diff: DiffToken[] }) {
  return (
    <>
      {diff.map((t, i) => (
        <span key={i} data-status={t.status}>
          {t.text}{' '}
        </span>
      ))}
    </>
  );
}
