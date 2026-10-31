# Deploy to Render

This repository is configured to deploy as a Docker-based Laravel application.

## Render web service

1. Create a **Web Service** from this GitHub repository.
2. Select **Docker** as the runtime, use the Singapore region when available, and select the Free plan.
3. Render reads `render.yaml` to configure the Laravel runtime. Keep the health check at `/up`.
4. Add the environment variables below in the Render dashboard, then set the pre-deploy command to `php artisan migrate --force`.

```text
APP_URL=https://your-render-service.onrender.com
ADMIN_USERNAME=your-private-username
ADMIN_PASSWORD=your-long-private-password
DB_CONNECTION=pgsql
DB_HOST=your-supabase-host
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=your-supabase-database-password
DB_SSLMODE=require
```

`/admin/projects`, `/admin/licenses`, and `/admin/achievements` use browser Basic Auth. The same credentials protect every create, update, and delete API request.

## Database

Create a free Supabase project, then use its direct Postgres connection settings for the `DB_*` values above. Supabase's Free plan includes a 500 MB Postgres database but may pause after a week without database activity. Do not use Render's free Postgres for this portfolio because it expires after 30 days.

Before replacing or recreating a production database, export a backup of the existing local MySQL data.
