  'restaurante'::business_type,
  tc.db_id,
  tn.db_id,
  'Comida mineira de raiz servida no fogão a lenha. Buffet livre no almoço, à la carte à noite e a melhor feijoada da cidade aos sábados.',
  'Autêntica comida mineira no fogão a lenha.',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80',
  '5538999990002',
  '3899990002',
  'sabormineirosalinas',
  NULL,
  'Av. Tancredo Neves, 540 - Centro',
  -16.1709,
  -42.2925,
  'published'::entity_status,
  true,
  'premium'::plan_tier,
  2,
  4.7,
  489,
  '["mineira","feijoada","fogão a lenha","almoço"]',
  '["https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=1200&q=80"]'
FROM _seed_ids tt
JOIN _seed_ids tc ON tc.fixture_id = 'c-restaurantes' AND tc.entity_type = 'category'
LEFT JOIN _seed_ids tn ON tn.fixture_id = 'n-centro-sal' AND tn.entity_type = 'neighborhood'
WHERE tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id)
SELECT 'b-sabor-mineiro', 'business', bs.id
FROM businesses bs
JOIN _seed_ids tt ON tt.db_id = bs.tenant_id AND tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE bs.slug = 'restaurante-sabor-mineiro';

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 0, '11:00', '23:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-sabor-mineiro' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-sabor-mineiro'
  WHERE bh.weekday = 0
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 1, '11:00', '23:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-sabor-mineiro' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-sabor-mineiro'
  WHERE bh.weekday = 1
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 2, '11:00', '23:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-sabor-mineiro' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-sabor-mineiro'
  WHERE bh.weekday = 2
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 3, '11:00', '23:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-sabor-mineiro' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-sabor-mineiro'
  WHERE bh.weekday = 3
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 4, '11:00', '23:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-sabor-mineiro' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-sabor-mineiro'
  WHERE bh.weekday = 4
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 5, '11:00', '23:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-sabor-mineiro' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-sabor-mineiro'
  WHERE bh.weekday = 5
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 6, '11:00', '23:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-sabor-mineiro' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-sabor-mineiro'
  WHERE bh.weekday = 6
);

INSERT INTO businesses (
  tenant_id, slug, name, type, category_id, neighborhood_id,
  description, short_description, logo_url, cover_url,
  whatsapp, phone, instagram, website, address, lat, lng,
  status, is_featured, plan_tier, price_level, rating_avg, rating_count, tags, gallery
)
SELECT
  tt.db_id,
  'clinica-vida-saude',
  'Clínica Vida & Saúde',
  'servico'::business_type,
  tc.db_id,
  tn.db_id,
  'Centro médico multidisciplinar com clínicos, pediatras, exames laboratoriais e atendimento por convênios. Agendamento online e teleconsulta.',
  'Centro médico multidisciplinar com teleconsulta.',
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1400&q=80',
  '5538999990003',
  '3899990003',
  'clinicavidasalinas',
  'https://clinicavida.com.br',
  'Rua São José, 75 - Fátima',
  -16.1745,
  -42.289,
  'published'::entity_status,
  false,
  'premium'::plan_tier,
  3,
  4.8,
  156,
  '["saúde","exames","convênio","teleconsulta"]',
  '["https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80"]'
FROM _seed_ids tt
JOIN _seed_ids tc ON tc.fixture_id = 'c-saude' AND tc.entity_type = 'category'
LEFT JOIN _seed_ids tn ON tn.fixture_id = 'n-fatima-sal' AND tn.entity_type = 'neighborhood'
WHERE tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id)
SELECT 'b-clinica-vida', 'business', bs.id
FROM businesses bs
JOIN _seed_ids tt ON tt.db_id = bs.tenant_id AND tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE bs.slug = 'clinica-vida-saude';

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 0, NULL, NULL, true
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-clinica-vida' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-clinica-vida'
  WHERE bh.weekday = 0
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 1, '07:00', '19:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-clinica-vida' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-clinica-vida'
  WHERE bh.weekday = 1
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 2, '07:00', '19:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-clinica-vida' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-clinica-vida'
  WHERE bh.weekday = 2
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 3, '07:00', '19:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-clinica-vida' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-clinica-vida'
  WHERE bh.weekday = 3
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 4, '07:00', '19:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-clinica-vida' AND tb.entity_type = 'business'
