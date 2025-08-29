<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('forms', function (Blueprint $table) {
            $table->boolean('is_active')->default(true)->after('success_message');
            $table->boolean('email_notifications')->default(true)->after('is_active');
            $table->string('notification_email')->nullable()->after('email_notifications');
            $table->text('description')->nullable()->after('name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('forms', function (Blueprint $table) {
            $table->dropColumn(['is_active', 'email_notifications', 'notification_email', 'description']);
        });
    }
};
