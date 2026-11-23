import { test } from '@playwright/test';
import { CartPage } from '../../pages/CartPage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Parcours d\'achat', () => {
  test('connexion valide puis ajout au panier', async ({ page }) => {
    const login = new LoginPage(page);
    const cart = new CartPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await login.expectLoggedIn();

    await cart.addProduct('Sauce Labs Backpack');
    await cart.open();
    await cart.expectCount(1);
  });

  test('utilisateur verrouillé : message d\'erreur', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('locked_out_user', 'secret_sauce');
    await test.expect(login.error).toContainText('locked out');
  });
});
