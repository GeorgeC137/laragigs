<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGigRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $gig = $this->route('gigs');

        if($this->user()->id !== $gig->user_id) {
            return false;
        }
        return true;
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'user_id' => 'exists:users,id',
            'logo' => 'nullable|string',
            'company' => 'required',
            'email' => 'required|email',
            'description' => 'required|string',
            'website' => 'required',
            'location' => 'required',
            'tag' => 'required'
        ];
    }
}
