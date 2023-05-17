from django import forms

class Contact_form(forms.Form):
    name = forms.CharField(label='Name:',max_length=50,required=True)
    email = forms.EmailField(label='Email',max_length=50,required=True)
    phone = forms.CharField( label='Phone',max_length=15, required=False)
    desc = forms.CharField(label='Description',widget=forms.Textarea())
