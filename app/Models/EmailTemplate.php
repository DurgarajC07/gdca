<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmailTemplate extends Model
{
    protected $fillable = [
        'name',
        'subject',
        'content',
        'placeholders',
    ];

    protected $casts = [
        'placeholders' => 'array',
    ];

    /**
     * Replace placeholders in the template content with provided data.
     */
    public function render(array $data = []): array
    {
        $subject = $this->subject;
        $content = $this->content;

        foreach ($data as $key => $value) {
            $placeholder = '{{' . $key . '}}';
            $subject = str_replace($placeholder, $value, $subject);
            $content = str_replace($placeholder, $value, $content);
        }

        return [
            'subject' => $subject,
            'content' => $content,
        ];
    }
}
