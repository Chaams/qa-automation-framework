import { expect, test } from '@playwright/test';

// API publique de démonstration — remplacez par l'API de votre projet.
const API = 'https://jsonplaceholder.typicode.com';

test.describe('Contrat API /users', () => {
  test('GET /users/1 respecte le schéma attendu', async ({ request }) => {
    const res = await request.get(`${API}/users/1`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject({
      id: 1,
      name: expect.any(String),
      email: expect.stringMatching(/@/),
      address: { city: expect.any(String) },
    });
  });

  test('GET /users/9999 renvoie 404', async ({ request }) => {
    const res = await request.get(`${API}/users/9999`);
    expect(res.status()).toBe(404);
  });

  test('POST /posts crée une ressource', async ({ request }) => {
    const res = await request.post(`${API}/posts`, { data: { title: 'qa', body: 'x', userId: 1 } });
    expect(res.status()).toBe(201);
    expect((await res.json()).id).toBeDefined();
  });
});
