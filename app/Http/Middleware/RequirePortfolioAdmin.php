<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RequirePortfolioAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $username = config('portfolio.admin_username');
        $password = config('portfolio.admin_password');

        if (
            ! empty($username)
            && ! empty($password)
            && hash_equals($username, (string) $request->getUser())
            && hash_equals($password, (string) $request->getPassword())
        ) {
            return $next($request);
        }

        return response('Unauthorized', 401, [
            'WWW-Authenticate' => 'Basic realm="Portfolio Admin"',
        ]);
    }
}
