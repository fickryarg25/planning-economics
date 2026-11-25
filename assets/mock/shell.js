/* AquaOps mockup shell: sidebar, navbar, mockup bar with role switch.
   Mockup only. Layout follows DESIGN.md (Sneat + Boxicons). */
(function () {
  var BASE = {
    design: 'DESIGN.md @ master 7084747a (23 Nov 2026)',
    staging: 'staging 8ca8552c (23 Nov 2026)'
  };
  var ROLES = [
    ['super_admin', 'Super Admin'],
    ['ops_manager', 'Ops Manager'],
    ['management', 'Management'],
    ['analyst', 'Analyst'],
    ['field_team', 'Field Team']
  ];

  function getRole() {
    try { return localStorage.getItem('aq-mock-role') || 'ops_manager'; } catch (e) { return 'ops_manager'; }
  }
  function setRole(r) {
    try { localStorage.setItem('aq-mock-role', r); } catch (e) {}
    applyRole(r);
  }
  function applyRole(r, silent) {
    document.body.setAttribute('data-role', r);
    document.querySelectorAll('[data-roles]').forEach(function (el) {
      var allowed = el.getAttribute('data-roles').split(/\s+/);
      el.classList.toggle('d-none', allowed.indexOf(r) === -1);
    });
    document.querySelectorAll('[data-hide-roles]').forEach(function (el) {
      var hidden = el.getAttribute('data-hide-roles').split(/\s+/);
      el.classList.toggle('d-none', hidden.indexOf(r) !== -1);
    });
    var sel = document.getElementById('mock-role');
    if (sel) sel.value = r;
    if (!silent) document.dispatchEvent(new CustomEvent('mock:role', { detail: r }));
  }

  function menuItem(href, icon, label, active, roles) {
    return '<li class="menu-item' + (active ? ' active' : '') + '"' + (roles ? ' data-roles="' + roles + '"' : '') + '>' +
      '<a href="' + href + '" class="menu-link"><i class="menu-icon tf-icons bx ' + icon + '"></i><div>' + label + '</div></a></li>';
  }
  function subItem(href, label, active, step) {
    return '<li class="menu-item' + (active ? ' active' : '') + '">' +
      '<a href="' + href + '" class="menu-link" data-plan-step="' + step + '"><div>' + label + '</div></a></li>';
  }
  function menuGroup(icon, label, open, children, roles) {
    return '<li class="menu-item' + (open ? ' open' : '') + '"' + (roles ? ' data-roles="' + roles + '"' : '') + '>' +
      '<a href="#" class="menu-link menu-toggle"><i class="menu-icon tf-icons bx ' + icon + '"></i><div>' + label + '</div></a>' +
      '<ul class="menu-sub">' + children + '</ul></li>';
  }
  function planStepKey() {
    var file = location.pathname.replace(/\\/g, '/').split('/').pop();
    if (file !== 'planning-calculator.html') return '';
    var raw = location.hash.slice(1);
    if (raw === 'step-2') return 'step-2';
    if (raw === 'step-3') return 'step-3';
    if (raw === 'baselines' || raw === 'baseline') return '';
    return 'step-1';
  }
  function header(label) {
    return '<li class="menu-header small text-uppercase"><span class="menu-header-text">' + label + '</span></li>';
  }

  function sidebar(active) {
    var MGMT = 'super_admin ops_manager management analyst';
    var onPlan = location.pathname.replace(/\\/g, '/').split('/').pop() === 'planning-calculator.html';
    var stepKey = planStepKey();
    return '<aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">' +
      '<div class="app-brand demo"><a href="index.html" class="app-brand-link" style="text-decoration:inherit">' +
      '<i class="bx bx-water fs-2 text-primary"></i><span class="app-brand-text demo fw-bolder ms-1">AquaOps</span></a>' +
      '<a href="#" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none" id="mock-menu-close" aria-label="Close menu"><i class="bx bx-chevron-left bx-sm align-middle"></i></a></div>' +
      '<div class="menu-inner-shadow"></div><ul class="menu-inner py-1">' +
      header('Dashboards') +
      menuItem('index.html', 'bx-pie-chart-alt', 'Overview', active === 'home') +
      menuItem('cage-reservations.html#alert-center', 'bx-bell', 'Alert Center', active === 'alerts') +
      header('Core Operations') +
      menuItem('#', 'bx-layer', 'Batches', false) +
      menuItem('cage-reservations.html#stocking', 'bx-package', 'Stocking Setup', active === 'stocking') +
      menuItem('feed-simulation.html', 'bx-dish', 'Feed Simulation', active === 'feed', MGMT) +
      menuItem('harvest-economics.html', 'bx-basket', 'Harvest & Revenue', active === 'harvest') +
      header('Planning') +
      menuGroup('bx-calculator', 'Planning Calculator', onPlan,
        subItem('planning-calculator.html#step-1', 'Step #1', stepKey === 'step-1', 'step-1') +
        subItem('planning-calculator.html#step-2', 'Step #2', stepKey === 'step-2', 'step-2') +
        subItem('planning-calculator.html#step-3', 'Step #3', stepKey === 'step-3', 'step-3'), MGMT) +
      header('Economics') +
      menuItem('#', 'bx-receipt', 'Purchases', false, MGMT) +
      menuItem('#', 'bx-wallet', 'Balances', false, MGMT) +
      header('References') +
      menuItem('#', 'bx-book', 'References', false) +
      '</ul></aside>';
  }

  function navbar(title) {
    var opts = ROLES.map(function (r) { return '<option value="' + r[0] + '">' + r[1] + '</option>'; }).join('');
    return '<nav class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">' +
      '<div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none"><a class="nav-item nav-link px-0 me-xl-4" href="#" id="mock-menu-open" aria-label="Open menu"><i class="bx bx-menu bx-sm"></i></a></div>' +
      '<div class="navbar-nav-right d-flex align-items-center w-100 gap-2">' +
      '<span class="fw-semibold text-muted d-none d-md-inline">' + title + '</span>' +
      '<div class="ms-auto d-flex align-items-center gap-2">' +
      '<span class="badge bg-label-warning">MOCKUP</span>' +
      '<label for="mock-role" class="small text-muted mb-0">View as</label>' +
      '<select id="mock-role" class="form-select form-select-sm" style="width:auto">' + opts + '</select>' +
      '</div></div></nav>';
  }

  function footer(branches) {
    return '<footer class="content-footer footer bg-footer-theme"><div class="container-xxl py-3 small text-muted">' +
      '<div><i class="bx bx-info-circle me-1"></i>Mockup only, sample data. Layout follows ' + BASE.design + '. Built on ' + BASE.staging + '; staging is not a base branch.</div>' +
      (branches ? '<div class="mt-1">Feature branches needed (in staging, not in master): ' + branches + '</div>' : '') +
      '</div></footer>';
  }

  window.AqMock = {
    init: function (opts) {
      var html = document.documentElement;
      var st = document.createElement('style');
      st.textContent = '.btn-outline-primary.active{color:#fff !important}';
      document.head.appendChild(st);
      html.classList.add('light-style', 'layout-menu-fixed');
      var content = document.getElementById('mock-content');
      var wrapper = document.createElement('div');
      wrapper.className = 'layout-wrapper layout-content-navbar';
      wrapper.innerHTML = '<div class="layout-container">' + sidebar(opts.active) +
        '<div class="layout-page">' + navbar(opts.title) +
        '<div class="content-wrapper"><div class="container-xxl flex-grow-1 container-p-y" id="mock-slot"></div>' +
        footer(opts.branches) + '<div class="content-backdrop fade"></div></div></div></div>' +
        '<div class="layout-overlay layout-menu-toggle" id="mock-overlay"></div>';
      content.parentNode.insertBefore(wrapper, content);
      document.getElementById('mock-slot').appendChild(content);
      content.classList.remove('d-none');

      var open = function (e) { e.preventDefault(); html.classList.add('layout-menu-expanded'); };
      var close = function (e) { e.preventDefault(); html.classList.remove('layout-menu-expanded'); };
      document.getElementById('mock-menu-open').addEventListener('click', open);
      document.getElementById('mock-menu-close').addEventListener('click', close);
      document.getElementById('mock-overlay').addEventListener('click', close);
      document.querySelectorAll('.menu-toggle').forEach(function (a) {
        a.addEventListener('click', function (e) {
          e.preventDefault();
          a.parentElement.classList.toggle('open');
        });
      });
      window.addEventListener('hashchange', function () {
        var key = planStepKey();
        document.querySelectorAll('[data-plan-step]').forEach(function (link) {
          link.parentElement.classList.toggle('active', link.getAttribute('data-plan-step') === key);
        });
      });
      document.getElementById('mock-role').addEventListener('change', function (e) { setRole(e.target.value); });
      applyRole(getRole());
    },
    role: getRole,
    applyRole: function () { applyRole(getRole(), true); },
    idr: function (v) {
      var neg = v < 0; v = Math.abs(Math.round(v * 100) / 100);
      var whole = Math.floor(v), frac = Math.round((v - whole) * 100);
      return (neg ? 'IDR -' : 'IDR ') + String(whole).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + String(frac).padStart(2, '0');
    },
    num: function (v, d) { return Number(v).toFixed(d === undefined ? 2 : d); },
    int: function (v) { return String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, ','); },
    screens: function (names, def) {
      function show() {
        var h = (location.hash || '#' + def).slice(1);
        if (names.indexOf(h) === -1) h = def;
        names.forEach(function (n) {
          var el = document.getElementById('screen-' + n);
          if (el) el.classList.toggle('d-none', n !== h);
        });
        document.querySelectorAll('[data-screen-tab]').forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('data-screen-tab') === h);
        });
        window.scrollTo(0, 0);
        document.dispatchEvent(new CustomEvent('mock:screen', { detail: h }));
      }
      window.addEventListener('hashchange', show);
      show();
    }
  };
})();
