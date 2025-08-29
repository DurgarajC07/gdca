<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Subscriber extends Model
{
    protected $fillable = [
        'email',
        'token',
        'status',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($subscriber) {
            $subscriber->token = Str::random(32);
        });
    }

    /**
     * Scope to get only subscribed users.
     */
    public function scopeSubscribed($query)
    {
        return $query->where('status', 'subscribed');
    }

    /**
     * Generate unsubscribe URL.
     */
    public function getUnsubscribeUrlAttribute(): string
    {
        return url('/unsubscribe/' . $this->token);
    }
}
