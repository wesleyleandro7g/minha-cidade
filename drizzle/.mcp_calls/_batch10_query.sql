-- standalone seed batch
BEGIN;
CREATE TEMP TABLE _seed_ids (
  fixture_id text PRIMARY KEY,
  entity_type text NOT NULL,
  db_id uuid NOT NULL
);
INSERT INTO _seed_ids (fixture_id, entity_type, db_id)
SELECT 'c-' || slug, 'category', id FROM categories;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id)
SELECT CASE slug WHEN 'salinas' THEN 't-salinas' WHEN 'montes-claros' THEN 't-montes-claros' END, 'tenant', id
FROM tenants WHERE slug IN ('salinas','montes-claros');
INSERT INTO _seed_ids (fixture_id, entity_type, db_id)
SELECT CASE nb.slug
  WHEN 'centro' THEN CASE t.slug WHEN 'salinas' THEN 'n-centro-sal' WHEN 'montes-claros' THEN 'n-centro-mc' END
  WHEN 'vila-amazonas' THEN 'n-vila-sal'
  WHEN 'aterrado' THEN 'n-aterrado-sal'
  WHEN 'fatima' THEN 'n-fatima-sal'
  WHEN 'ibituruna' THEN 'n-ibituruna-mc'
END, 'neighborhood', nb.id
FROM neighborhoods nb
JOIN tenants t ON t.id = nb.tenant_id
WHERE t.slug IN ('salinas','montes-claros');

INSERT INTO events (
  tenant_id, business_id, slug, name, description, banner_url,
  starts_at, ends_at, venue, address, lat, lng, is_free, ticket_from
)
SELECT tt.db_id, NULL,
  'festival-gastronomico-mc', 'Festival Gastronômico do Norte de Minas', 'Chefs regionais apresentam o melhor da cozinha sertaneja.', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80',
  NOW() + INTERVAL '8 days',
  NOW() + INTERVAL '11 days',
  'Centro de Convenções', 'Av. Cula Mangabeira, 100 - Montes Claros/MG', -16.728, -43.857, false,
  30
FROM _seed_ids tt

WHERE tt.fixture_id = 't-montes-claros' AND tt.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;

INSERT INTO news (tenant_id, slug, title, excerpt, cover_url, author, published_at)
SELECT tt.db_id, 'salinas-bate-recorde-de-turistas', 'Salinas bate recorde de turistas na alta temporada', 'Rede hoteleira registra ocupação acima de 90% impulsionada pelo turismo da cachaça.', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80', 'Redação Minha Cidade',
  NOW() - INTERVAL '1 days'
FROM _seed_ids tt
WHERE tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;

INSERT INTO news (tenant_id, slug, title, excerpt, cover_url, author, published_at)
SELECT tt.db_id, 'nova-praca-revitalizada-no-centro', 'Praça central é revitalizada e ganha área de lazer', 'Obra inclui playground, academia ao ar livre e novo paisagismo no coração da cidade.', 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1000&q=80', 'Redação Minha Cidade',
  NOW() - INTERVAL '3 days'
FROM _seed_ids tt
WHERE tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;

INSERT INTO news (tenant_id, slug, title, excerpt, cover_url, author, published_at)
SELECT tt.db_id, 'feira-do-produtor-amplia-horario', 'Feira do produtor amplia horário de funcionamento', 'Agora os moradores podem aproveitar produtos frescos também no fim da tarde.', 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1000&q=80', 'Redação Minha Cidade',
  NOW() - INTERVAL '5 days'
FROM _seed_ids tt
WHERE tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;

INSERT INTO reviews (tenant_id, business_id, rating, comment, created_at)
SELECT tt.db_id, tb.db_id, 5, 'Melhor comida mineira da região! O fogão a lenha faz toda diferença.',
  NOW() - INTERVAL '4 days'
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-sabor-mineiro' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM reviews rv
  JOIN _seed_ids tb2 ON tb2.db_id = rv.business_id AND tb2.fixture_id = 'b-sabor-mineiro'
  WHERE rv.comment = 'Melhor comida mineira da região! O fogão a lenha faz toda diferença.'
);

INSERT INTO reviews (tenant_id, business_id, rating, comment, created_at)
SELECT tt.db_id, tb.db_id, 4, 'Atendimento ótimo e porções generosas. Feijoada nota 10.',
  NOW() - INTERVAL '9 days'
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-sabor-mineiro' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM reviews rv
  JOIN _seed_ids tb2 ON tb2.db_id = rv.business_id AND tb2.fixture_id = 'b-sabor-mineiro'
  WHERE rv.comment = 'Atendimento ótimo e porções generosas. Feijoada nota 10.'
);

INSERT INTO reviews (tenant_id, business_id, rating, comment, created_at)
SELECT tt.db_id, tb.db_id, 5, 'Degustação incrível, aprendi muito sobre a cachaça de Salinas.',
  NOW() - INTERVAL '2 days'
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-cachacaria' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM reviews rv
  JOIN _seed_ids tb2 ON tb2.db_id = rv.business_id AND tb2.fixture_id = 'b-cachacaria'
  WHERE rv.comment = 'Degustação incrível, aprendi muito sobre a cachaça de Salinas.'
);

INSERT INTO reviews (tenant_id, business_id, rating, comment, created_at)
SELECT tt.db_id, tb.db_id, 5, 'Saí renovada! Profissionais super atenciosas.',
  NOW() - INTERVAL '6 days'
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-studio-bella' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM reviews rv
  JOIN _seed_ids tb2 ON tb2.db_id = rv.business_id AND tb2.fixture_id = 'b-studio-bella'
  WHERE rv.comment = 'Saí renovada! Profissionais super atenciosas.'
);


COMMIT;
