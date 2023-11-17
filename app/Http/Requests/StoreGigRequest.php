<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class StoreGigRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;

    }

    public function prepareForValidation()
    {
        $this->merge([
            'user_id' => $this->user()->id
        ]);
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
            'logo' => 'nullable|string',
            'user_id' => 'exists:users,id',
            'company' => 'required|unique:jobs,company',
            'email' => 'required|email|unique:jobs,email',
            'description' => 'required|string',
            'website' => 'required',
            'location' => 'required',
            'tag' => 'required'
        ];
    }
}
