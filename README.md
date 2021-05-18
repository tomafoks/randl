# randl
React-and-Laravel

install laravel:

1) Installing migrations and seeds

    php artisan migrate --seed

2) Installing OrderSeeder after major migrations

    php artisan db:seed --class=OrderSeeder

3) Installing Laravel Passport 

    php artisan passport:install