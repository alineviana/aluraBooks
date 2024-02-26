import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ConsultaCepService } from "../service/consulta-cep.service";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.css"],
})
export class CadastroComponent implements OnInit {
  constructor(
    private router: Router,
    private consultaCepService: ConsultaCepService
  ) { }

  ngOnInit(): void { }

  consultaCEP(ev: any, form: NgForm) {
    const cep = ev.target.value;
    if (cep !== "") {
      this.consultaCepService.getConsultaCep(cep).subscribe((resultado) => {
        console.log(resultado);
        this.populandoEndereco(resultado, form);
      });
    }
  }

  populandoEndereco(dados: any, form: NgForm) {
    console.log('Data received from API:', dados);
    form.form.patchValue({
      endereco: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    });
    console.log('Form values after patching:', form.value);
  }

  cadastrar(form: NgForm) {
    if (form.valid) {
      this.router.navigate(["./sucesso"]);
    } else {
      alert("Formulário inválido");
    }
    console.log(form.controls);
  }
}
