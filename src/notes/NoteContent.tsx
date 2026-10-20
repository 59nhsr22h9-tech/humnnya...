import {useRef, useState} from 'react';
import {ChevronLeft, Pin} from 'lucide-react';
import {noteUpdatedAt} from './format';
import type {NoteRecord} from './types';
import './notes.css';

export default function NoteContent({notes, oneUI}: {notes: readonly NoteRecord[]; oneUI: boolean}) {
  const [selected, setSelected] = useState<NoteRecord | null>(null);
  const list = useRef<HTMLDivElement>(null);
  const detailBack = useRef<HTMLButtonElement>(null);
  const scroll = useRef(0);
  const lastSelected = useRef<string | null>(null);
  const pinned = notes.filter(note => note.pinned);
  const remaining = notes.filter(note => !note.pinned);
  const open = (note: NoteRecord) => {
    scroll.current = list.current?.scrollTop || 0;
    lastSelected.current = note.id;
    setSelected(note);
    requestAnimationFrame(() => detailBack.current?.focus());
  };
  const back = () => {
    setSelected(null);
    requestAnimationFrame(() => {
      if (!list.current) return;
      list.current.scrollTop = scroll.current;
      [...list.current.querySelectorAll<HTMLButtonElement>('button[data-note-id]')].find(button => button.dataset.noteId === lastSelected.current)?.focus({preventScroll: true});
    });
  };
  const rows = (items: readonly NoteRecord[]) => <div className="note-group">{items.map(note => <button key={note.id} data-note-id={note.id} className="note-row" onClick={() => open(note)} aria-label={`${note.title}, 최근 수정 ${noteUpdatedAt(note.updatedAt)}, 열기`}>
    <span className="note-row-label"><strong>{note.title}</strong><time dateTime={note.updatedAt} aria-label={'최근 수정: ' + noteUpdatedAt(note.updatedAt)}>{noteUpdatedAt(note.updatedAt)}</time></span>
    {note.pinned && <span className="note-pin" aria-label="고정된 메모"><Pin size={12} fill="currentColor"/></span>}
  </button>)}</div>;

  return <section className={'notes-app ' + (oneUI ? 'notes-one-ui' : 'notes-ios')} aria-label="메모 보관함" onKeyDown={event => {
    if (selected && event.key === 'Escape') {event.preventDefault(); back();}
  }}>
    {selected ? <>
      <div className="note-detail-bar"><button className="note-detail-back" ref={detailBack} onClick={back}><ChevronLeft size={18}/>{oneUI ? '모든 노트' : '메모'}</button>{selected.pinned && <span className="note-detail-pinned"><Pin size={11}/>고정됨</span>}</div>
      <article className="note-detail-scroll" aria-label="메모 내용">
        <time className="note-detail-date" dateTime={selected.updatedAt} aria-label="최근 수정 날짜">{noteUpdatedAt(selected.updatedAt, true)}</time>
        <h2 className="note-detail-title">{selected.title}</h2>
        <div className="note-body">{selected.body}</div>
      </article>
    </> : <>
      <div className="notes-heading"><h2>{oneUI ? '모든 노트' : '메모'}</h2></div>
      <div className="notes-list" ref={list}>
        {pinned.length > 0 && <div className="notes-section"><h3><Pin size={12} fill="currentColor"/>고정된 메모</h3>{rows(pinned)}</div>}
        {remaining.length > 0 && <div className="notes-section"><h3>{oneUI ? '다른 노트' : '메모'}</h3>{rows(remaining)}</div>}
        {notes.length === 0 && <p className="notes-empty">메모가 없습니다.</p>}
        <p className="notes-count">{notes.length}개의 메모</p>
      </div>
    </>}
  </section>;
}
