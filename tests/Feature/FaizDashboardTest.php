<?php

namespace Tests\Feature;

use Tests\TestCase;

class FaizDashboardTest extends TestCase
{
    public function test_faiz_dashboard_route_returns_successful_response(): void
    {
        $response = $this->get("/faiz/dashboard");
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component("Dashboard"));
    }
}
