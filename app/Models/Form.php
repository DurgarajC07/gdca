<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Form extends Model
{
    protected $fillable = [
        'name',
        'description',
        'structure',
        'recipient_email',
        'success_message',
        'is_active',
        'email_notifications',
        'notification_email',
    ];

    protected $casts = [
        'structure' => 'array',
        'is_active' => 'boolean',
        'email_notifications' => 'boolean',
    ];

    /**
     * Get the fields from the structure.
     */
    public function getFieldsAttribute()
    {
        return $this->structure ?: [];
    }

    /**
     * Get the form submissions for the form.
     */
    public function submissions(): HasMany
    {
        return $this->hasMany(FormSubmission::class);
    }
}
