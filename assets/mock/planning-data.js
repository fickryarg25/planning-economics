/* Shared sample data for the planning, feed simulation and cage reservation mockups. Sample data only. */
(function () {
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function d(s) { var p = String(s).split('-'); return new Date(Date.UTC(+p[0], +p[1] - 1, +p[2])); }
  function iso(dt) { return dt.toISOString().slice(0, 10); }
  function add(s, n) { var x = d(s); x.setUTCDate(x.getUTCDate() + Math.round(n)); return iso(x); }
  function fmt(s) { if (!s) return '-'; var x = d(s); return String(x.getUTCDate()).padStart(2, '0') + ' ' + MON[x.getUTCMonth()] + ' ' + x.getUTCFullYear(); }
  function overlap(a1, a2, b1, b2) { return d(a1) <= d(b2) && d(b1) <= d(a2); }

  window.AqPlan = {
    TODAY: '2026-11-25',
    // Existing cages are one pool for nursery and grow-out (no separate nursery units)
    CAGES: [
      { id: 1, name: 'Cage 1', m3: 27, m2: 9 }, { id: 2, name: 'Cage 2', m3: 27, m2: 9 }, { id: 3, name: 'Cage 3', m3: 27, m2: 9 },
      { id: 4, name: 'Cage 4', m3: 48, m2: 16 }, { id: 5, name: 'Cage 5', m3: 48, m2: 16 }, { id: 6, name: 'Cage 6', m3: 48, m2: 16 },
      { id: 7, name: 'Cage 7', m3: 48, m2: 16 }, { id: 8, name: 'Cage 8', m3: 48, m2: 16 }, { id: 9, name: 'Cage 9', m3: 48, m2: 16 },
      { id: 10, name: 'Cage 10', m3: 48, m2: 16 }
    ],
    // Current use of cages at planning time (stockings and other plans)
    OCC: {
      3: { kind: 'In use', ref: 'POM-02 (stocking)', from: '2026-06-01', until: '2026-12-08' },
      9: { kind: 'Reserved', ref: 'PLAN-202611-0005 Kerapu cantang', from: '2027-01-10', until: '2027-06-30' },
      10: { kind: 'In use', ref: 'KER-01 (stocking)', from: '2026-08-01', until: '2027-03-15' }
    },
    // Approved baseline used in the reservation and alert screens
    BASELINE: {
      code: 'PLAN-202611-0004', name: 'Batch 2 Pompano two-phase', start: '2026-12-01', end: '2027-07-31',
      reservations: [
        { cage: 'Cage 1', phase: 'Nursery', from: '2026-12-01', until: '2027-01-30' },
        { cage: 'Cage 2', phase: 'Nursery', from: '2026-12-01', until: '2027-01-30', conflict: { ref: 'LOB-04 (stocking)', until: '2026-12-03', since: '2026-11-22' } },
        { cage: 'Cage 4', phase: 'Grow-out', from: '2027-01-30', until: '2027-07-24' },
        { cage: 'Cage 5', phase: 'Grow-out', from: '2027-01-30', until: '2027-07-24' },
        { cage: 'Cage 6', phase: 'Grow-out', from: '2027-01-30', until: '2027-07-24' },
        { cage: 'Cage 7', phase: 'Grow-out', from: '2027-01-30', until: '2027-07-24' }
      ]
    },
    FEED_PRICE: { 'Megami GR-1': 25800, 'Megami GR-2': 25000, 'Megami GR-3': 24000, 'Megami GR-4': 23000, 'Megami GR-5': 22500, 'Megami GR-7': 22000, 'Megami GR-10': 21500, 'Megami GR-12': 21000 },
    REF_PRICE: { nursery: 25800, growout: 22000 },
    date: { add: add, fmt: fmt, overlap: overlap, days: function (a, b) { return Math.round((d(b) - d(a)) / 86400000); } },
    encode: function (o) { return encodeURIComponent(JSON.stringify(o)); },
    decode: function () {
      try { var q = new URLSearchParams(location.search).get('d'); return q ? JSON.parse(q) : null; } catch (e) { return null; }
    }
  };
})();
