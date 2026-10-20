import {useRef, useState} from 'react';
import {ChevronLeft, Info, PhoneIncoming, PhoneMissed, PhoneOutgoing, UserRound} from 'lucide-react';
import {callDate, callDirection, callDuration, callStatus, callSummary, callTime, callTimezone} from './format';
import type {CallRecord} from './types';
import './calls.css';

function DirectionIcon({call}: {call: CallRecord}) {
  const Icon = call.direction === 'missed' ? PhoneMissed : call.direction === 'outgoing' ? PhoneOutgoing : PhoneIncoming;
  return <Icon size={12} aria-hidden="true"/>;
}

export default function CallContent({calls, oneUI}: {calls: readonly CallRecord[]; oneUI: boolean}) {
  const [selected, setSelected] = useState<CallRecord | null>(null);
  const [filter, setFilter] = useState<'all' | 'missed'>('all');
  const list = useRef<HTMLDivElement>(null);
  const backButton = useRef<HTMLButtonElement>(null);
  const scroll = useRef(0);
  const lastSelected = useRef<string | null>(null);
  const filtered = filter === 'missed' ? calls.filter(call => call.direction === 'missed') : calls;
  const open = (call: CallRecord) => {
    scroll.current = list.current?.scrollTop || 0;
    lastSelected.current = call.id;
    setSelected(call);
    requestAnimationFrame(() => backButton.current?.focus());
  };
  const back = () => {
    setSelected(null);
    requestAnimationFrame(() => {
      if (!list.current) return;
      list.current.scrollTop = scroll.current;
      [...list.current.querySelectorAll<HTMLButtonElement>('button[data-call-id]')].find(button => button.dataset.callId === lastSelected.current)?.focus({preventScroll: true});
    });
  };
  return <section className={'calls-app ' + (oneUI ? 'calls-one-ui' : 'calls-ios')} aria-label="전화 기록">
    {selected ? <>
      <button className="call-detail-back" ref={backButton} onClick={back}><ChevronLeft size={18}/>{oneUI ? '최근기록' : '최근 통화'}</button>
      <div className="call-detail-scroll">
        <div className="call-contact-heading"><span className="call-contact-avatar"><UserRound size={34} strokeWidth={1.4}/></span><h2 className={selected.direction === 'missed' ? 'call-missed-name' : ''}>{selected.contactName}</h2><p>{callSummary(selected)}</p></div>
        <dl className="call-detail-fields">
          <div><dt>통화 구분</dt><dd>{callDirection(selected)}</dd></div>
          <div><dt>통화 상태</dt><dd className={selected.direction === 'missed' ? 'call-missed-name' : ''}>{callStatus(selected)}</dd></div>
          <div><dt>날짜</dt><dd><time dateTime={selected.timestamp}>{callDate(selected.timestamp, true)}</time></dd></div>
          <div><dt>시간</dt><dd>{callTime(selected.timestamp, true)}<small>{callTimezone(selected.timestamp)}</small></dd></div>
          <div><dt>통화 길이</dt><dd>{callDuration(selected.durationSeconds)}</dd></div>
        </dl>
        {selected.status === 'unanswered' && <p className="call-unanswered-note">전화를 걸었지만 상대가 받지 않았습니다.</p>}
      </div>
    </> : <>
      <div className="calls-heading">{oneUI && <span className="calls-app-name">전화</span>}<h2>{oneUI ? '최근기록' : '최근 통화'}</h2></div>
      <div className="call-filters" aria-label="통화 기록 필터">
        <button aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>전체</button>
        <button aria-pressed={filter === 'missed'} onClick={() => setFilter('missed')}>부재중</button>
      </div>
      <div className="call-history-list" ref={list}>
        {filtered.map(call => <button key={call.id} data-call-id={call.id} className={'call-row' + (call.direction === 'missed' ? ' call-missed' : '')} onClick={() => open(call)} aria-label={`${call.contactName}, ${callSummary(call)}, ${callDate(call.timestamp)} ${callTime(call.timestamp)}, 상세 정보`}>
          <span className="call-row-direction"><DirectionIcon call={call}/></span>
          <span className="call-row-contact"><strong>{call.contactName}</strong><span>{callSummary(call)}</span></span>
          <time dateTime={call.timestamp} className="call-row-time"><span>{callDate(call.timestamp)}</span><span>{callTime(call.timestamp)}</span></time>
          <span className="call-row-info"><Info size={15}/></span>
        </button>)}
        {filtered.length === 0 && <p className="call-history-empty">{filter === 'missed' ? '부재중 전화가 없습니다.' : '통화 기록이 없습니다.'}</p>}
      </div>
    </>}
  </section>;
}
