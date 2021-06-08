# randl
React-and-Laravel

### install laravel:

1) Installing migrations and seeds
```sh
	php artisan migrate --seed
```
2) Installing other seeds
```sh
	php artisan db:seed --class=OrderSeeder
	php artisan db:seed --class=PermissionSeeder
	php artisan db:seed --class=RolePermissionSeeder
```
3) Installing Laravel Passport 
```sh
	php artisan passport:install
```
### install react:
```sh
1) npm install
2) npm start
3) в src/index.tsx изменить строку: axios.defaults.baseURL = 'поменять на нужный домен/api/';
```
